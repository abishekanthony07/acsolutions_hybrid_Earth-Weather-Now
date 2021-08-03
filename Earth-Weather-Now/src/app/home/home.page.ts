import {Component} from '@angular/core';
import {WeatherService} from '../api/weather.service';
import {HttpClient} from '@angular/common/http';
import {SpeicherService} from '../speicher.service';
import {AlertController} from '@ionic/angular';
import { WeatherDataModel } from '../model/WeatherDataModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  city: string;
  stateCode: string;
  laenderCode: string;
  erweiterteSuche = false;
  showHomeInformation = false;
  closeInformation = false;
  resultExists = false;
  emptyData = 'Bitte geben Sie in die Suche einen Ort oder die PLZ ein, um das Wetter anzuzeigen.';
  emptyDataTitle = 'Suche starten';

  //Model mit Oberflächen-Referenzen
  model: WeatherDataModel;

  currentDate: number;
  wetterBildSource: string;
  cityName: string;
  coordsLon: string;
  coordsLat: string;
  currentTemp: string;
  feelsLike: string;
  minTemp: string;
  maxTemp: string;
  humidity: number;
  rain: number;
  wind: number;
  pressure: number;
  visibility: number;
  timezone: string;
  sunrise: string;
  sunset: string;

  constructor(
    private httpClient: HttpClient, 
    private speicherservice: SpeicherService, 
    private alertController: AlertController
    ) {
    }

  ionViewWillEnter(){
    this.loadHideInformation();
  }

  /**Search and show data functions */
  //Diese Methode ist zuständig für die Suche vom Wetter eines Ortes
  //Bei einem Fehler wird entsprechend die Methode zum Anzeigen des Fehlers aufgerufen
  async search() {
    const dataToShow = new WeatherService(this.httpClient).getData(this, this.success, this.failed);
    if (!dataToShow) {
      await this.failed(this, 'Ungültige Eingabe!', 'Bitte geben Sie etwas in die Suche ein, damit die Suche gestartet werden kann!');
    }
  }

  //Wenn die Suche gespeichert werden soll, wird vorerst 
  //die Methode zum Hinzufügen eines Kommentars ausgeführt
  async saveSearch() {
    this.addComment();
  }

  /**Erfolgsfall der Suche */
  //home ist in diesem fall diese Klasse; (aufgrund von Referenzproblem so gelöst)
  //Somit wird im Erfolgsfall die Methode zum Anzeigen der Daten aufgerufen
  async success(home: any, jsonResult: any) {
    home.result = jsonResult;
    home.showResult(true, jsonResult);
  }

  /**Fehlerfall der Suche */
  //Bei einem Fehler wird die View entsprechend angezeigt und der Benutzer benachrichtigt
  async failed(home: any, titel: string, message: string) {
    home.showResult(false, undefined);
    home.emptyDataTitle = titel;
    home.emptyData = message;
    await home.alertUser(titel, message);
  }

  //Default-Methode, welche einen Alert aufbaut
  async alertUser(titel: string, nachricht: string) {
    const alert = await this.alertController.create({
      cssClass: 'alertMessage',
      header: titel,
      subHeader: '',
      message: nachricht,
      buttons: ['OK']
    });
    await alert.present();
  }

  //Ein Kommentar KANN hinzugefügt werden, wenn man das Wetter speichern möchte.
  //WEnn auf speichern geklickt wird, wir das Wetter lokal auf dem Gerät gespeichert.
  async addComment(){
    const alert = await this.alertController.create({
      header: 'Notiz hinzufügen',
      message: 'Hier können Sie eine Notiz hinterlassen, welche später in der Detailansicht angezeigt wird.',
      inputs: [
        {
          name: 'kommentar',
          placeholder: 'angenehmes Wetter'
        }
      ],
      buttons: [
        {
          text: 'abbruch',
          role: 'cancel'
        },
        {
          text: 'speichern',
          handler: data => {
            const search = {
              city: this.city,
              state: this.stateCode,
              land: this.laenderCode
            };
            this.speicherservice.saveSearch(this.model, data.kommentar, search);
          }
        }
      ]
    });
    alert.present();
  }

  /**Information-Container functions */
  //Die Info-Box wird geladen, wenn diese nicht für immer durch den Benutzer entfernt wurde
  async loadHideInformation() {
    this.showHomeInformation = await this.speicherservice.getHideInformation();
    this.closeInformation = this.showHomeInformation;
  }

  //Die Infobox wird ausgeblendet
  //WICHTIG: Falls der Benutzer "Nicht mehr anzeigen" ausgewählt hatte, wird das entsprechend auf dem
  //Gerät vermerkt und nie wieder angezeigt
  //Ansonsten erscheint es beim erneuten Laden der Startseite
  async closeButtonPressed() {
    this.closeInformation = true;
    this.speicherservice.setHideInformation(this.showHomeInformation);
  }

  /** Toolbar functions */
  //Die Felder für die Erweiterte Suche wird eingeblendet
  async onErweitert(){
    this.erweiterteSuche = !this.erweiterteSuche;
    this.resetErweitertValuesIfHidden();
  }

  //Wenn die Erweiterte Suche geschlossen wird, werden dessen Felder geresetet
  private resetErweitertValuesIfHidden(){
    if(!this.erweiterteSuche && !this.resultExists) {
      this.stateCode = '';
      this.laenderCode = '';
    }
  }

  /**Show result */
  //Diese MEthode zeigt die Daten des Models an der Oberfläche an
  private showResult(value: boolean, jsonResult: any){
    this.resultExists = value;
    if(jsonResult){
      this.model = new WeatherDataModel(jsonResult);
      this.updateView();
    }
  }

  /**Aktualisierung der View */
  private updateView(){
    this.currentDate = this.model.date;
    this. wetterBildSource = this.model.wetterBildSource;
            this.cityName = this.model.cityName;
            this.laenderCode = this.model.laenderCode;
            this.coordsLon = this.model.coordsLon;
            this.coordsLat = this.model.coordsLat;
            this.currentTemp = this.model.currentTemp;
            this.feelsLike = this.model.feelsLike;
            this.minTemp = this.model.minTemp;
            this.maxTemp = this.model.maxTemp;
            this.humidity = this.model.humidity;
            this.rain = this.model.rain;
            this.wind = this.model.wind;
            this.pressure = this.model.pressure;
            this.visibility = this.model.visibility;
            this.timezone = this.model.timezone;
            this.sunrise = this.model.sunrise;
            this.sunset = this.model.sunset;
  }
}
