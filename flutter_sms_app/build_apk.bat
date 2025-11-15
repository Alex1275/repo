@echo off
echo 🚀 Script de build de l'APK SMS Manager
echo ========================================
echo.

REM Vérifier si Flutter est installé
where flutter >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Flutter n'est pas installé sur votre système
    echo 📥 Installez Flutter depuis: https://flutter.dev/docs/get-started/install
    pause
    exit /b 1
)

echo ✅ Flutter détecté
flutter --version
echo.

REM Nettoyer les anciens builds
echo 🧹 Nettoyage des anciens builds...
flutter clean

REM Récupérer les dépendances
echo 📦 Installation des dépendances...
flutter pub get

REM Générer les fichiers Hive
echo ⚙️  Génération des fichiers Hive...
flutter pub run build_runner build --delete-conflicting-outputs

REM Build de l'APK
echo.
echo 🔨 Génération de l'APK...
echo Choisissez le type de build:
echo 1) APK standard (un seul fichier, plus gros)
echo 2) APK par architecture (3 fichiers, plus petits)
set /p choice="Votre choix (1 ou 2): "

if "%choice%"=="2" (
    echo 📱 Génération des APKs par architecture...
    flutter build apk --split-per-abi
    echo.
    echo ✅ Build terminé !
    echo.
    echo 📂 APKs générés dans:
    echo    build\app\outputs\flutter-apk\
    echo.
    dir /B build\app\outputs\flutter-apk\*.apk
    echo.
    echo Fichiers générés:
    echo   - app-armeabi-v7a-release.apk (pour anciens appareils)
    echo   - app-arm64-v8a-release.apk (pour appareils récents)
    echo   - app-x86_64-release.apk (pour émulateurs)
) else (
    echo 📱 Génération de l'APK standard...
    flutter build apk
    echo.
    echo ✅ Build terminé !
    echo.
    echo 📂 APK généré dans:
    echo    build\app\outputs\flutter-apk\app-release.apk
    echo.
    dir build\app\outputs\flutter-apk\app-release.apk
)

echo.
echo 🎉 Succès ! Vous pouvez maintenant installer l'APK sur votre appareil Android.
echo.
echo 📲 Pour installer:
echo    1. Copiez le fichier APK sur votre téléphone
echo    2. Ouvrez le fichier APK sur votre téléphone
echo    3. Autorisez l'installation depuis des sources inconnues si demandé
echo    4. Installez l'application
echo.
pause
