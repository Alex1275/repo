# Flutter SMS Manager

Application Flutter pour la gestion automatique des SMS avec le numéro 627084006.

## Fonctionnalités

✅ **Envoi de SMS**
- Envoie des SMS au numéro 627084006
- Supprime automatiquement le SMS envoyé (pas de trace dans la messagerie)

✅ **Réception de SMS**
- Intercepte les SMS reçus de 627084006
- Stocke les messages dans un cache local (Hive)
- Supprime automatiquement le SMS de la messagerie

✅ **Interface Utilisateur**
- Envoi facile de messages
- Liste des messages en cache
- Indicateur de messages non lus
- Suppression de messages individuels ou en masse

## Installation

### Prérequis
- Flutter SDK (>=3.0.0)
- Android SDK
- Appareil Android physique (les SMS ne fonctionnent pas sur émulateur)

### Étapes d'installation

1. **Cloner le projet**
```bash
cd flutter_sms_app
```

2. **Installer les dépendances**
```bash
flutter pub get
```

3. **Générer les fichiers Hive**
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

4. **Lancer l'application**
```bash
flutter run
```

## Permissions

L'application nécessite les permissions suivantes :
- `SEND_SMS` - Pour envoyer des SMS
- `RECEIVE_SMS` - Pour recevoir des SMS
- `READ_SMS` - Pour lire les SMS
- `WRITE_SMS` - Pour supprimer les SMS
- `READ_PHONE_STATE` - Pour accéder à l'état du téléphone

⚠️ **Important** : La suppression automatique des SMS peut nécessiter que l'application soit définie comme application SMS par défaut sur certains appareils Android (Android 4.4+).

## Architecture

```
lib/
├── main.dart                 # Point d'entrée
├── models/
│   └── sms_message.dart      # Modèle de données SMS
├── services/
│   └── sms_service.dart      # Service de gestion SMS
└── screens/
    └── home_screen.dart      # Écran principal
```

## Utilisation

### Envoyer un SMS
1. Tapez votre message dans le champ de texte
2. Appuyez sur le bouton d'envoi
3. Le SMS sera envoyé puis automatiquement supprimé

### Voir les messages reçus
- Les messages de 627084006 apparaissent automatiquement dans la liste
- Les messages non lus sont surlignés en bleu
- Appuyez sur un message pour le marquer comme lu

### Supprimer des messages
- Bouton de suppression individuel sur chaque message
- Bouton "Vider le cache" pour supprimer tous les messages

## Limitations

- **Android uniquement** : Les SMS ne fonctionnent que sur Android
- **Permissions système** : La suppression automatique peut être limitée sur certaines versions Android
- **Application par défaut** : Sur Android 4.4+, certaines fonctionnalités peuvent nécessiter que l'app soit l'app SMS par défaut

## Sécurité

⚠️ **Attention** : Cette application supprime automatiquement les SMS. Assurez-vous de :
- Bien comprendre les implications de cette fonctionnalité
- Avoir l'autorisation d'intercepter et supprimer des SMS
- Sauvegarder les messages importants ailleurs si nécessaire

## Technologies utilisées

- **Flutter** : Framework d'interface utilisateur
- **Telephony** : Gestion des SMS
- **Hive** : Base de données locale
- **Permission Handler** : Gestion des permissions

## Dépannage

### Les SMS ne sont pas supprimés
- Vérifiez que toutes les permissions sont accordées
- Sur Android 4.4+, définissez l'app comme app SMS par défaut dans les paramètres

### Les SMS entrants ne sont pas détectés
- Vérifiez la permission `RECEIVE_SMS`
- Assurez-vous que l'application est en cours d'exécution ou autorisée en arrière-plan

### Erreur de compilation
```bash
flutter clean
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
```

## Licence

Ce projet est à usage éducatif et de démonstration.
