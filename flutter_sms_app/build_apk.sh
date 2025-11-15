#!/bin/bash

echo "🚀 Script de build de l'APK SMS Manager"
echo "========================================"
echo ""

# Vérifier si Flutter est installé
if ! command -v flutter &> /dev/null
then
    echo "❌ Flutter n'est pas installé sur votre système"
    echo "📥 Installez Flutter depuis: https://flutter.dev/docs/get-started/install"
    exit 1
fi

echo "✅ Flutter détecté"
flutter --version
echo ""

# Nettoyer les anciens builds
echo "🧹 Nettoyage des anciens builds..."
flutter clean

# Récupérer les dépendances
echo "📦 Installation des dépendances..."
flutter pub get

# Générer les fichiers Hive
echo "⚙️  Génération des fichiers Hive..."
flutter pub run build_runner build --delete-conflicting-outputs

# Build de l'APK
echo ""
echo "🔨 Génération de l'APK..."
echo "Choisissez le type de build:"
echo "1) APK standard (un seul fichier, plus gros)"
echo "2) APK par architecture (3 fichiers, plus petits)"
read -p "Votre choix (1 ou 2): " choice

if [ "$choice" = "2" ]; then
    echo "📱 Génération des APKs par architecture..."
    flutter build apk --split-per-abi
    echo ""
    echo "✅ Build terminé !"
    echo ""
    echo "📂 APKs générés dans:"
    echo "   build/app/outputs/flutter-apk/"
    echo ""
    ls -lh build/app/outputs/flutter-apk/*.apk
    echo ""
    echo "Fichiers générés:"
    echo "  - app-armeabi-v7a-release.apk (pour anciens appareils)"
    echo "  - app-arm64-v8a-release.apk (pour appareils récents)"
    echo "  - app-x86_64-release.apk (pour émulateurs)"
else
    echo "📱 Génération de l'APK standard..."
    flutter build apk
    echo ""
    echo "✅ Build terminé !"
    echo ""
    echo "📂 APK généré dans:"
    echo "   build/app/outputs/flutter-apk/app-release.apk"
    echo ""
    ls -lh build/app/outputs/flutter-apk/app-release.apk
fi

echo ""
echo "🎉 Succès ! Vous pouvez maintenant installer l'APK sur votre appareil Android."
echo ""
echo "📲 Pour installer:"
echo "   1. Copiez le fichier APK sur votre téléphone"
echo "   2. Ouvrez le fichier APK sur votre téléphone"
echo "   3. Autorisez l'installation depuis des sources inconnues si demandé"
echo "   4. Installez l'application"
echo ""
