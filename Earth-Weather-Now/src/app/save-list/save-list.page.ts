import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
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
  private showSavePageInformation = true;
  private closeInformation = false;

  constructor(private speicherService: SpeicherService,
    private alertController: AlertController,
    private datepipe: DatePipe,
    private route: Router){
  }

  ngOnInit(): void {
  }

   /**Information functions */
   async loadHideInformation() {
    this.showSavePageInformation = await this.speicherService.getHideSavePageInformation();
    this.closeInformation = this.showSavePageInformation;
  }

  async closeButtonPressed() {
    this.closeInformation = true;
    this.speicherService.setHideSavePageInformation(this.showSavePageInformation);
  }

  /** Daten von der Datenbank laden */

  async getList(){
    const list =  await this.speicherService.getSearchList();
    this.listIsEmpty = true;
    this. weatherlist = [];
    list.forEach((listItem: any) => {
      this.listIsEmpty = false;
      this.weatherlist.push(WeatherDataModel.convertSavedJson(listItem));
    });
    this.weatherlist.reverse();
  }

  ionViewWillEnter(){
    this.loadHideInformation();
    this.getList();
  }

  /**Funktionen der kompletten Liste */
  async deleteAll(){
    const sicherheitsabfrage = 'Möchten Sie alle Wettervorhersagen löschen?';
    const deleteAlert = await this.alertController.create({
      header: '',
      message: sicherheitsabfrage,
      backdropDismiss: false,
      buttons: [{
        text: 'Abbrechen',
        role: 'Cancel'
      }, {
        text: 'Ja',
        handler: async () => {
          this.weatherlist.forEach(currentWeather =>{
            this.speicherService.deleteSearchItem(String(currentWeather.date));
          });
          this.getList();
        }
      }]
    });
    await deleteAlert.present();
  }

  async sortList(){
    this.weatherlist.reverse();
  }

  /** Navigation zu Detailansicht */
  async onClicked(weather: WeatherDataModel){
    this.speicherService.setCurrentSelectedWeather(weather);
    this.route.navigate(['detailview']);
  }


  /** Löschen einzelner Daten */
  async onLoeschen(weather: WeatherDataModel, slider: IonItemSliding){
    await this.deleteAlert(weather, slider);
  }

  private async deleteAlert(currentWeather: WeatherDataModel, slider: IonItemSliding){
    const sicherheitsabfrage = `Möchten Sie die Wettervorhersage vom "${this.convertDate(currentWeather.date)} Uhr" 
    von "${currentWeather.cityName}" löschen?`;
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
          this.speicherService.deleteSearchItem(String(currentWeather.date));
          this.getList();
        }
      }]
    });
    await deleteAlert.present();
  }

  private convertDate(datenumber: number): string{
    const date = new Date().setTime(datenumber);
    return this.datepipe.transform(date, 'dd.MM.yyyy HH:mm');
  }
}
