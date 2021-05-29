# Earth-Weather-Now

## Beschreibung
> Dieses Projekt wird im Rahmen eines Wirtschaftsinformatik-Studiums an der DHBW in Karlsruhe entwickelt. Dabei wird vom Modul 'Weiterführende Konzepte der mobilen Entwicklung' eine Cordova-Applikation erwartet, welches eine WEB-API anspricht.
In diesem Projekt wird die WEB-API OpenWeather verwendet, mit welcher die aktuellen Wetterdaten eines Ortes zurückgegeben wird: https://openweathermap.org/current

## Screenshots
<img src="https://user-images.githubusercontent.com/54862087/120060489-8078fd80-c058-11eb-8caf-c782aea44dfa.png" alt="Screenshot_1622190084" width="200"/> <img src="https://user-images.githubusercontent.com/54862087/120060491-8242c100-c058-11eb-8b14-ccf659bc32bd.png" alt="Screenshot_1622190095" width="200"/> <img src="https://user-images.githubusercontent.com/54862087/120060494-840c8480-c058-11eb-9679-72180fdd89a9.png" alt="Screenshot_1622190315" width="200"/> <img src="https://user-images.githubusercontent.com/54862087/120060498-85d64800-c058-11eb-80cc-76802e1cb079.png" alt="Screenshot_1622190324" width="200"/> <img src="https://user-images.githubusercontent.com/54862087/120060504-8d95ec80-c058-11eb-95aa-a0bae65994b3.png" alt="Screenshot_1622190525" width="200"/> <img src="https://user-images.githubusercontent.com/54862087/120060508-92f33700-c058-11eb-8a06-de7e3ec53268.png" alt="Screenshot_1622190529" width="200"/> <img src="https://user-images.githubusercontent.com/54862087/120060509-94bcfa80-c058-11eb-875c-72994c3fe167.png" alt="Screenshot_1622190536" width="200"/> <img src="https://user-images.githubusercontent.com/54862087/120060512-95559100-c058-11eb-8a0e-085ba75b548f.png" alt="Screenshot_1622190549" width="200"/> <img src="https://user-images.githubusercontent.com/54862087/120060514-971f5480-c058-11eb-8a19-753ac2d76157.png" alt="Screenshot_1622195782" width="200"/>


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




