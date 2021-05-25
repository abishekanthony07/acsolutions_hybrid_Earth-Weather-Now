import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { reverse } from 'dns';
import { $ } from 'protractor';
import { WeatherDataModel } from '../model/WeatherDataModel';
import { SpeicherService } from '../speicher.service';

@Component({
  selector: 'app-save-list',
  templateUrl: './save-list.page.html',
  styleUrls: ['./save-list.page.scss'],
})
export class SaveListPage implements OnInit {
  private weatherlist: WeatherDataModel[];
  private currentWeather: WeatherDataModel;
  private listIsEmpty = true;

  constructor(private speicherService: SpeicherService,private alertController: AlertController){
  }
  ngOnInit(): void {
  }

  async getList(){
    const list =  await this.speicherService.getSearchList();
    this. weatherlist = [];
    list.forEach((listItem: any) => {
      this.listIsEmpty = false;
      this.weatherlist.push(WeatherDataModel.convertSavedJson(listItem));
    });
    this.weatherlist.reverse();
    console.log(this.weatherlist);
  }

  ionViewWillEnter(){
    this.getList();
  }

  async onLoeschen(weather: WeatherDataModel, slider: IonItemSliding){
    await this.deleteAlert(weather, slider);
  }

  private async deleteAlert(currentWeather: WeatherDataModel, slider: IonItemSliding){
    const sicherheitsabfrage = `Möchten Sie die Wettervorhersage vom "${currentWeather.date}" 
    von "${this.currentWeather.cityName}" löschen?`;
    const deleteAlert = await this.alertController.create({
      header: '',
      message: sicherheitsabfrage,
      backdropDismiss: false,
      buttons: [{
        text: 'Abbrechen',
        role: 'Cancel',
        handler: () =>{
          slider.close();
        }
      }, {
        text: 'Ja',
        handler: async () => {
          //await this.speicherservice.deleteKategorie(kategorie);
          this.getList();
        }
      }]
    });
    await deleteAlert.present();
  }
}
