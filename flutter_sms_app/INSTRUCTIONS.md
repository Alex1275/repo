# Instructions de déploiement

## Guide rapide de démarrage

### 1. Prérequis
- Flutter SDK installé (version 3.0 ou supérieure)
- Android Studio ou VS Code avec les extensions Flutter
- Un appareil Android physique (les SMS ne fonctionnent pas sur émulateur)
- Câble USB pour connecter votre appareil

### 2. Installation

```bash
# Se placer dans le dossier du projet
cd flutter_sms_app

# Installer les dépendances
flutter pub get

# Générer les fichiers Hive (IMPORTANT!)
flutter pub run build_runner build --delete-conflicting-outputs

# Vérifier que votre appareil est connecté
flutter devices

# Lancer l'application sur votre appareil
flutter run
```

### 3. Première utilisation

Au premier lancement, l'application demandera les permissions suivantes :
- ✅ Envoyer des SMS
- ✅ Recevoir des SMS
- ✅ Lire les SMS
- ✅ Écrire/Supprimer des SMS
- ✅ Lire l'état du téléphone

**IMPORTANT** : Acceptez TOUTES les permissions pour que l'application fonctionne correctement.

### 4. Configuration spéciale pour Android 4.4+

Sur les versions Android 4.4 et supérieures, pour que la suppression automatique des SMS fonctionne, vous devrez peut-être :

1. Aller dans les **Paramètres Android**
2. Chercher **Applications SMS par défaut**
3. Sélectionner **SMS Manager** comme application par défaut

⚠️ Note : Cela remplacera temporairement votre application de messagerie habituelle.

### 5. Utilisation

**Envoyer un SMS :**
1. Tapez votre message dans le champ de texte
2. Appuyez sur le bouton d'envoi (icône avion)
3. Le SMS sera envoyé à 627084006 puis supprimé automatiquement

**Recevoir des SMS :**
- Les SMS de 627084006 sont automatiquement interceptés
- Ils sont stockés dans le cache de l'application
- Ils sont supprimés de la messagerie standard
- Un badge rouge indique les messages non lus

**Gérer les messages :**
- Appuyez sur un message pour le marquer comme lu
- Utilisez l'icône poubelle pour supprimer un message
- Bouton "vider le cache" pour tout supprimer

### 6. Dépannage

**Erreur de compilation :**
```bash
flutter clean
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
flutter run
```

**Les SMS ne sont pas supprimés :**
- Vérifiez que l'application est définie comme app SMS par défaut
- Vérifiez que toutes les permissions sont accordées

**Les SMS entrants ne sont pas détectés :**
- Vérifiez les permissions
- Redémarrez l'application
- Assurez-vous que l'application n'est pas tuée par l'optimisation de batterie

**Pour désactiver l'optimisation de batterie :**
1. Paramètres → Batterie → Optimisation de la batterie
2. Chercher "SMS Manager"
3. Sélectionner "Ne pas optimiser"

### 7. Structure du code

```
lib/
├── main.dart                 # Point d'entrée
├── models/
│   ├── sms_message.dart      # Modèle de données
│   └── sms_message.g.dart    # Généré par Hive
├── services/
│   └── sms_service.dart      # Logique SMS
└── screens/
    └── home_screen.dart      # Interface utilisateur
```

### 8. Fonctionnalités principales

✅ Envoi de SMS au 627084006 avec suppression automatique
✅ Réception et interception des SMS de 627084006
✅ Stockage en cache local (Hive)
✅ Suppression automatique des SMS reçus
✅ Interface utilisateur intuitive
✅ Gestion des messages non lus
✅ Suppression individuelle ou en masse

### 9. Sécurité et confidentialité

⚠️ **IMPORTANT** : Cette application :
- Intercepte et supprime des SMS automatiquement
- Nécessite des permissions sensibles
- Doit être utilisée de manière responsable
- Les données sont stockées localement uniquement

### 10. Build pour production

Pour créer un APK de production :

```bash
# APK standard
flutter build apk

# APK par architecture (taille réduite)
flutter build apk --split-per-abi

# Le fichier sera dans : build/app/outputs/flutter-apk/
```

Pour créer un App Bundle (Google Play) :

```bash
flutter build appbundle

# Le fichier sera dans : build/app/outputs/bundle/release/
```

### 11. Numéro de téléphone

Le numéro cible est codé en dur : **627084006**

Pour le modifier, éditez le fichier `lib/services/sms_service.dart` :
```dart
static const String TARGET_NUMBER = '627084006'; // Modifier ici
```

### 12. Support

En cas de problème :
1. Vérifiez les logs : `flutter logs`
2. Vérifiez les permissions Android
3. Redémarrez l'appareil si nécessaire
4. Assurez-vous que l'appareil a une carte SIM active

---

Bonne utilisation ! 🚀
