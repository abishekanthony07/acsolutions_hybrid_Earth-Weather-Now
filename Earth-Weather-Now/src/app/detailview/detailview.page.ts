import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { WeatherDataModel } from '../model/WeatherDataModel';
import { SpeicherService } from '../speicher.service';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.page.html',
  styleUrls: ['./detailview.page.scss'],
})
export class DetailviewPage implements OnInit {

  //Model mit Oberflächen-Referenzen
  model: WeatherDataModel;

  kommentar: string;
  sucheingabe: string;
  stateCode: string;
  land: string;

  currentDate: number;
  wetterBildSource: string;
  cityName: string;
  laenderCode: string;
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

  constructor(private router: Router,
    private datepipe: DatePipe,
    private alertController: AlertController,
    private speicherService: SpeicherService) {
   }

   //Das angeklickte Wetter aus der Listenansicht wird geholt.
   //Fall das Model invalide ist, wird wieder zurück navigiert, um die Fehleransicht zu vermeiden
  async ngOnInit() {
    this.model = await this.speicherService.getCurrentSelectedWeather();
    if (!this.model){
      this.router.navigate(['save-list']);
    }else{
      this.updateView();
    }
  }

  //Diese Methode baut einen Alert auf, über welchen das Wetter gelöscht werden kann
  async deleteSearch(){
    const sicherheitsabfrage = `Möchten Sie die Wettervorhersage vom "${this.convertDate(this.model.date)} Uhr" 
    von "${this.model.cityName}" löschen?`;
    const deleteAlert = await this.alertController.create({
      header: '',
      message: sicherheitsabfrage,
      backdropDismiss: false,
      buttons: [{
        text: 'Abbrechen',
        role: 'Cancel',
        handler: () =>{
        }
      }, {
        text: 'Ja',
        handler: async () => {
          this.speicherService.deleteSearchItem(String(this.model.date));
    this.router.navigate(['save-list']);
        }
      }]
    });
    await deleteAlert.present();
  }

  //Die View wird mit den Model-Daten aufgebaut
  private updateView(){
    this.currentDate = this.model.date;
    this.sucheingabe = this.model.jsonResult.search.city;
    this.stateCode = this.model.jsonResult.search.state;
    this.land = this.model.jsonResult.search.land;

    this.kommentar = this.model.jsonResult.comment;
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

  //Das Datum wird in ein valides (für einen Menschen lesbares) Datum transformiert
  private convertDate(datenumber: number): string{
    const date = new Date().setTime(datenumber);
    return this.datepipe.transform(date, 'dd.MM.yyyy HH:mm');
  }
}
