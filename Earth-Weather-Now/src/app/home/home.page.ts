import {Component} from '@angular/core';
import {WeatherService} from '../api/weather.service';
import {HttpClient} from '@angular/common/http';
import {SpeicherService} from '../speicher.service';
import {AlertController} from '@ionic/angular';
import {OpenWeatherConverterService} from '../api/open-weather-converter.service';

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

  wetterBildSource = '../../assets/wetter/sonne/sonne.png';
  cityName: string;
  coordsLon: string;
  coordsLat: string;
  currentTemp: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  rain: number;
  wind: number;
  pressure: number;
  visibility: number;
  timezone: string;
  sunrise: string;
  sunset: string;

  constructor(private httpClient: HttpClient, private speicherservice: SpeicherService, private alertController: AlertController) {
    this.loadHideInformation();
  }

  /**Search and show data functions */
  async search() {
    const dataToShow = new WeatherService(this.httpClient).getData(this, this.success, this.failed);
    if (!dataToShow) {
      await this.failed(this, 'Ungültige Eingabe!', 'Bitte geben Sie etwas in die Suche ein, damit die Suche gestartet werden kann!');
    }
  }

  async success(home: any, jsonResult: any) {
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

  private showResult(value: boolean, jsonResult: any){
    this.resultExists = value;
    if(jsonResult){
      OpenWeatherConverterService.convertJsonResult(this, jsonResult);
    }
  }

}
