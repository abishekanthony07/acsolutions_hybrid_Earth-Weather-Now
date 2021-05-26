import {Component} from '@angular/core';
import {WeatherService} from '../api/weather.service';
import {HttpClient} from '@angular/common/http';
import {SpeicherService} from '../speicher.service';
import {AlertController} from '@ionic/angular';
import {OpenWeatherConverterService} from '../api/open-weather-converter.service';
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

  constructor(private httpClient: HttpClient, private speicherservice: SpeicherService, private alertController: AlertController) {
  }

  ionViewWillEnter(){
    this.loadHideInformation();
  }

  /**Search and show data functions */
  async search() {
    const dataToShow = new WeatherService(this.httpClient).getData(this, this.success, this.failed);
    if (!dataToShow) {
      await this.failed(this, 'Ungültige Eingabe!', 'Bitte geben Sie etwas in die Suche ein, damit die Suche gestartet werden kann!');
    }
  }

  async saveSearch() {
    this.addComment();
  }

  async success(home: any, jsonResult: any) {
    home.result = jsonResult;
    home.showResult(true, jsonResult);
  }

  async failed(home: any, titel: string, message: string) {
    home.showResult(false, undefined);
    home.emptyDataTitle = titel;
    home.emptyData = message;
    await home.alertUser(titel, message);
  }

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

  async addComment(){
    const alert = await this.alertController.create({
      header: 'Kommentar hinzufügen',
      message: 'Zum Speichern können Sie einen Kommentar hinzufügen',
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
              sucheingabe: this.city,
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

  /**Information functions */
  async loadHideInformation() {
    this.showHomeInformation = await this.speicherservice.getHideInformation();
    this.closeInformation = this.showHomeInformation;
  }

  async closeButtonPressed() {
    this.closeInformation = true;
    this.speicherservice.setHideInformation(this.showHomeInformation);
  }

  /** Toolbar functions */
  async onErweitert(){
    this.erweiterteSuche = !this.erweiterteSuche;
    this.resetErweitertValuesIfHidden();
  }

  private resetErweitertValuesIfHidden(){
    if(!this.erweiterteSuche && !this.resultExists) {
      this.stateCode = '';
      this.laenderCode = '';
    }
  }

  /**Show result */
  private showResult(value: boolean, jsonResult: any){
    this.resultExists = value;
    if(jsonResult){
      this.model = new WeatherDataModel(jsonResult);
      this.updateView();
    }
  }

  private updateView(){
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
