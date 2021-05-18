# acsolutions_hybrid_Earth-Weather-Now

Projekt erfolgreich installieren:
- *git, npm, node* auf die aktuellste Version updaten:
    - `git --version` ausführen
    - `node -v` ausführen
    - `npm -v` ausführen
- *OpenJDK 1.8* und *Gradle* muss installiert sein
    - `java --version` ausführen
    - `gradle -v` ausführen
- Android Studio wird benötigt und ein Emulator muss installiert sein
    - `avdmanager list avd` sollte die installierten und verwendbaren Emulatoren anzeigen
- mit einem *Versioncontroll* Projekt auschecken
    - `npm install` im Earth-Weather-Now--Ordner ausführen
    - `ncu` ausführen
    - `ionic info` ausführen und überprüfen, ob alle module installiert sind
    - `ionic cordova requirements android` ausführen
    - optional: `ng test` ausführen
    - `ionic serve` sollte im WebBrowser die App anzeigen
    - `ionic cordova run browser` sollte eine WebApp installieren und im Browser öffnen
    - `ionic cordova run android` sollte auf einem android_Emulator die App installieren und öffnen
    - NUR AUF MAC möglich!: `ionic cordova run ios` sollte auf einem ios_Emulator die App installieren und öffnen