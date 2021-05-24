# Earth-Weather-Now

## Beschreibung

> Dieses Projekt wird im Rahmen eines Wirtschaftsinformatik-Studiums an der DHBW in Karlsruhe entwickelt. Dabei wird vom Modul 'Weiterführende Konzepte der mobilen Entwicklung' eine Cordova-Applikation erwartet, welches eine WEB-API anspricht.
In diesem Projekt wird die WEB-API OpenWeather verwendet, mit welcher die aktuellen Wetterdaten eines Ortes zurückgegeben wird: https://openweathermap.org/current

## Installation

> 
- *git, npm, node* auf die aktuellste Version updaten:
    - `git --version` ausführen | >=2.31.1
    - `node -v` ausführen | >=16.1.0
    - `npm -v` ausführen | >=7.11.2
- *OpenJDK 1.8* und *Gradle* muss installiert sein
    - `java --version` ausführen | 1.8.0
    - `gradle -v` ausführen | 6.8
- Android Studio wird benötigt und ein Emulator muss installiert sein
    - `avdmanager list avd` | sollte die installierten und verwendbaren Emulatoren anzeigen
- mit einem *Versioncontroll* Projekt auschecken
    - `npm install` im Earth-Weather-Now--Ordner ausführen
    - `ncu` ausführen
    - `ionic info` ausführen  |  überprüfen, ob alle module installiert sind
    - `ionic cordova requirements android` ausführen
    - optional: `ng test` ausführen
    - `ionic serve`  | sollte im WebBrowser die App anzeigen
    - `ionic cordova run browser`  | sollte eine WebApp installieren und im Browser öffnen
    - `ionic cordova run android` |  sollte auf einem android_Emulator die App installieren und öffnen
    - NUR AUF MAC möglich: `ionic cordova run ios`  | sollte auf einem ios_Emulator die App installieren und öffnen