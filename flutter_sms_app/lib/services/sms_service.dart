import 'package:flutter/material.dart';
import 'package:telephony/telephony.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:hive/hive.dart';
import '../models/sms_message.dart';

class SmsService {
  static final SmsService _instance = SmsService._internal();
  factory SmsService() => _instance;
  SmsService._internal();

  final Telephony telephony = Telephony.instance;
  static const String TARGET_NUMBER = '627084006';
  static const String SMS_BOX_NAME = 'sms_cache';

  /// Initialiser le service SMS
  Future<void> initialize() async {
    await _requestPermissions();
    await _setupSmsListener();
  }

  /// Demander les permissions SMS
  Future<bool> _requestPermissions() async {
    Map<Permission, PermissionStatus> statuses = await [
      Permission.sms,
      Permission.phone,
    ].request();

    bool allGranted = statuses.values.every((status) => status.isGranted);

    if (!allGranted) {
      debugPrint('⚠️ Certaines permissions SMS ne sont pas accordées');
    }

    return allGranted;
  }

  /// Configurer l'écoute des SMS entrants
  Future<void> _setupSmsListener() async {
    telephony.listenIncomingSms(
      onNewMessage: _onMessageReceived,
      onBackgroundMessage: _onBackgroundMessageReceived,
      listenInBackground: true,
    );
  }

  /// Callback pour les nouveaux SMS (foreground)
  void _onMessageReceived(SmsMessage message) async {
    debugPrint('📱 SMS reçu de: ${message.address}');

    if (message.address?.contains(TARGET_NUMBER) ?? false) {
      debugPrint('✅ SMS du numéro cible détecté');
      await _processSmsFromTarget(message);
    }
  }

  /// Callback pour les SMS en arrière-plan
  static Future<void> _onBackgroundMessageReceived(SmsMessage message) async {
    debugPrint('📱 SMS reçu en arrière-plan de: ${message.address}');

    if (message.address?.contains(TARGET_NUMBER) ?? false) {
      await Hive.initFlutter();
      if (!Hive.isAdapterRegistered(0)) {
        Hive.registerAdapter(SmsMessageAdapter());
      }

      final instance = SmsService();
      await instance._processSmsFromTarget(message);
    }
  }

  /// Traiter un SMS du numéro cible
  Future<void> _processSmsFromTarget(SmsMessage smsMessage) async {
    try {
      // 1. Stocker dans le cache
      await _storeSmsInCache(smsMessage);

      // 2. Supprimer le SMS de la messagerie
      await _deleteSmsFromInbox(smsMessage);

      debugPrint('✅ SMS traité et supprimé avec succès');
    } catch (e) {
      debugPrint('❌ Erreur lors du traitement du SMS: $e');
    }
  }

  /// Stocker le SMS dans le cache Hive
  Future<void> _storeSmsInCache(SmsMessage smsMessage) async {
    try {
      final box = await Hive.openBox<SmsMessage>(SMS_BOX_NAME);

      final cachedMessage = SmsMessage(
        sender: smsMessage.address ?? TARGET_NUMBER,
        message: smsMessage.body ?? '',
        timestamp: smsMessage.date ?? DateTime.now(),
        messageId: smsMessage.id?.toString(),
      );

      await box.add(cachedMessage);
      debugPrint('💾 SMS stocké dans le cache (Total: ${box.length})');
    } catch (e) {
      debugPrint('❌ Erreur stockage cache: $e');
      rethrow;
    }
  }

  /// Supprimer le SMS de la boîte de réception
  Future<void> _deleteSmsFromInbox(SmsMessage smsMessage) async {
    try {
      if (smsMessage.id == null) {
        debugPrint('⚠️ ID SMS manquant, impossible de supprimer');
        return;
      }

      // Note: La suppression nécessite des permissions système élevées
      // Sur Android moderne, cela peut nécessiter d'être l'app SMS par défaut
      final deleted = await telephony.deleteSmsById(smsMessage.id!);

      if (deleted) {
        debugPrint('🗑️ SMS supprimé de la messagerie (ID: ${smsMessage.id})');
      } else {
        debugPrint('⚠️ Échec suppression SMS (permissions insuffisantes)');
      }
    } catch (e) {
      debugPrint('❌ Erreur suppression SMS: $e');
    }
  }

  /// Envoyer un SMS et le supprimer ensuite
  Future<bool> sendAndDeleteSms(String message) async {
    try {
      debugPrint('📤 Envoi SMS à $TARGET_NUMBER');

      // Envoyer le SMS
      final result = await telephony.sendSms(
        to: TARGET_NUMBER,
        message: message,
      );

      if (result.isSuccessful) {
        debugPrint('✅ SMS envoyé avec succès');

        // Attendre un peu pour que le SMS soit enregistré
        await Future.delayed(const Duration(seconds: 2));

        // Supprimer le SMS envoyé
        await _deleteSentSms(message);

        return true;
      } else {
        debugPrint('❌ Échec envoi SMS');
        return false;
      }
    } catch (e) {
      debugPrint('❌ Erreur envoi SMS: $e');
      return false;
    }
  }

  /// Supprimer le SMS envoyé
  Future<void> _deleteSentSms(String message) async {
    try {
      // Récupérer tous les SMS envoyés
      List<SmsMessage> sentMessages = await telephony.getSentSms(
        columns: [SmsColumn.ID, SmsColumn.ADDRESS, SmsColumn.BODY, SmsColumn.DATE],
      );

      // Trouver le SMS correspondant
      for (var sms in sentMessages) {
        if (sms.address == TARGET_NUMBER && sms.body == message) {
          if (sms.id != null) {
            await telephony.deleteSmsById(sms.id!);
            debugPrint('🗑️ SMS envoyé supprimé (ID: ${sms.id})');
            break;
          }
        }
      }
    } catch (e) {
      debugPrint('❌ Erreur suppression SMS envoyé: $e');
    }
  }

  /// Récupérer tous les SMS en cache
  Future<List<SmsMessage>> getCachedSms() async {
    try {
      final box = await Hive.openBox<SmsMessage>(SMS_BOX_NAME);
      return box.values.toList().reversed.toList(); // Plus récents en premier
    } catch (e) {
      debugPrint('❌ Erreur lecture cache: $e');
      return [];
    }
  }

  /// Marquer un SMS comme lu
  Future<void> markAsRead(int index) async {
    try {
      final box = await Hive.openBox<SmsMessage>(SMS_BOX_NAME);
      final message = box.getAt(index);
      if (message != null) {
        message.isRead = true;
        await message.save();
      }
    } catch (e) {
      debugPrint('❌ Erreur marquage comme lu: $e');
    }
  }

  /// Supprimer un SMS du cache
  Future<void> deleteCachedSms(int index) async {
    try {
      final box = await Hive.openBox<SmsMessage>(SMS_BOX_NAME);
      await box.deleteAt(index);
      debugPrint('🗑️ SMS supprimé du cache');
    } catch (e) {
      debugPrint('❌ Erreur suppression cache: $e');
    }
  }

  /// Vider tout le cache
  Future<void> clearCache() async {
    try {
      final box = await Hive.openBox<SmsMessage>(SMS_BOX_NAME);
      await box.clear();
      debugPrint('🗑️ Cache vidé');
    } catch (e) {
      debugPrint('❌ Erreur vidage cache: $e');
    }
  }

  /// Compter les SMS non lus
  Future<int> getUnreadCount() async {
    try {
      final box = await Hive.openBox<SmsMessage>(SMS_BOX_NAME);
      return box.values.where((msg) => !msg.isRead).length;
    } catch (e) {
      debugPrint('❌ Erreur comptage non lus: $e');
      return 0;
    }
  }
}
