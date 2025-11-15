# 🏗️ Guide de génération de l'APK

## Méthode 1 : Script automatique (Recommandé)

### Sur Linux/Mac:
```bash
cd flutter_sms_app
chmod +x build_apk.sh
./build_apk.sh
```

### Sur Windows:
```cmd
cd flutter_sms_app
build_apk.bat
```

Le script va :
1. ✅ Vérifier que Flutter est installé
2. 🧹 Nettoyer les anciens builds
3. 📦 Installer les dépendances
4. ⚙️  Générer les fichiers nécessaires (Hive)
5. 🔨 Construire l'APK

---

## Méthode 2 : Commandes manuelles

### Étape 1 : Prérequis
```bash
# Vérifier Flutter
flutter doctor

# Si Flutter n'est pas installé, téléchargez-le depuis:
# https://flutter.dev/docs/get-started/install
```

### Étape 2 : Préparer le projet
```bash
cd flutter_sms_app

# Nettoyer
flutter clean

# Installer les dépendances
flutter pub get

# Générer les fichiers Hive (OBLIGATOIRE)
flutter pub run build_runner build --delete-conflicting-outputs
```

### Étape 3 : Générer l'APK

**Option A - APK standard (un seul fichier, ~40-50 MB)**
```bash
flutter build apk
```
📂 L'APK sera dans: `build/app/outputs/flutter-apk/app-release.apk`

**Option B - APK par architecture (recommandé, ~15-20 MB chacun)**
```bash
flutter build apk --split-per-abi
```
📂 Les APKs seront dans: `build/app/outputs/flutter-apk/`
- `app-armeabi-v7a-release.apk` - Pour anciens appareils (32-bit)
- `app-arm64-v8a-release.apk` - Pour appareils récents (64-bit) ⭐ **Le plus courant**
- `app-x86_64-release.apk` - Pour émulateurs

---

## 📲 Installation sur Android

### Méthode 1 : Via câble USB
```bash
# Connecter votre appareil Android
# Activer le mode développeur et le débogage USB

# Installer directement
flutter install
```

### Méthode 2 : Transfert manuel
1. **Transférer l'APK** sur votre téléphone (USB, Bluetooth, email, etc.)
2. **Localiser le fichier** dans le gestionnaire de fichiers
3. **Appuyer sur l'APK** pour lancer l'installation
4. **Autoriser** l'installation depuis des sources inconnues si demandé
5. **Installer** l'application

### Méthode 3 : ADB (Android Debug Bridge)
```bash
# Connecter votre appareil via USB

# Pour APK standard
adb install build/app/outputs/flutter-apk/app-release.apk

# Pour APK 64-bit (le plus courant)
adb install build/app/outputs/flutter-apk/app-arm64-v8a-release.apk
```

---

## ⚠️ Dépannage

### Erreur : "Flutter not found"
```bash
# Téléchargez et installez Flutter depuis:
# https://flutter.dev/docs/get-started/install

# Ajoutez Flutter au PATH
export PATH="$PATH:`pwd`/flutter/bin"  # Linux/Mac
# ou
set PATH=%PATH%;C:\flutter\bin  # Windows
```

### Erreur : "build_runner failed"
```bash
# Supprimer le cache et régénérer
flutter clean
rm -rf .dart_tool/
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
```

### Erreur : "Gradle build failed"
```bash
# Mettre à jour Gradle dans android/gradle/wrapper/gradle-wrapper.properties
# Ou exécuter dans android/
./gradlew clean
```

### APK trop gros
```bash
# Utiliser split-per-abi pour réduire la taille
flutter build apk --split-per-abi

# Ou activer la minification (ProGuard) dans android/app/build.gradle:
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
    }
}
```

---

## 🎯 Quel APK choisir ?

| APK | Taille | Compatible avec | Recommandé pour |
|-----|--------|-----------------|-----------------|
| **app-release.apk** | ~40-50 MB | Tous les appareils | Installation simple, un seul fichier |
| **app-arm64-v8a-release.apk** | ~15-20 MB | Appareils récents (2016+) | ⭐ **La plupart des utilisateurs** |
| **app-armeabi-v7a-release.apk** | ~15-20 MB | Anciens appareils (32-bit) | Appareils plus anciens |
| **app-x86_64-release.apk** | ~15-20 MB | Émulateurs | Tests uniquement |

💡 **Conseil** : Si vous ne savez pas, utilisez `app-arm64-v8a-release.apk` qui fonctionne sur 95% des appareils Android modernes.

---

## 🔐 Signature de l'APK (Optionnel pour production)

Pour publier sur le Play Store, vous devez signer l'APK :

```bash
# Créer une clé de signature
keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

# Configurer dans android/key.properties
storePassword=<mot_de_passe>
keyPassword=<mot_de_passe>
keyAlias=upload
storeFile=<chemin_vers_key.jks>

# Puis builder
flutter build apk --release
```

---

## 📊 Taille des APKs typiques

- APK debug : ~60-80 MB (non optimisé)
- APK release standard : ~40-50 MB
- APK release split (arm64) : ~15-20 MB ⭐
- APK release minifié : ~10-15 MB

---

## ✅ Vérification après installation

Après installation, vérifiez que :
1. ✅ L'application se lance
2. ✅ Les permissions SMS sont demandées
3. ✅ Vous pouvez envoyer un message de test
4. ✅ L'application peut recevoir des SMS

---

**Besoin d'aide ?** Consultez les logs :
```bash
flutter logs
# ou
adb logcat | grep flutter
```
