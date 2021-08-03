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
  
  ionViewWillEnter(){
    this.loadHideInformation();
    this.getList();
  }

   /**Information functions */
   //Die Info-Box wird geladen, wenn diese nicht für immer durch den Benutzer entfernt wurde
   async loadHideInformation() {
    this.showSavePageInformation = await this.speicherService.getHideSavePageInformation();
    this.closeInformation = this.showSavePageInformation;
  }

  //Die Infobox wird ausgeblendet
  //WICHTIG: Falls der Benutzer "Nicht mehr anzeigen" ausgewählt hatte, wird das entsprechend auf dem
  //Gerät vermerkt und nie wieder angezeigt
  //Ansonsten erscheint es beim erneuten Laden der Startseite
  async closeButtonPressed() {
    this.closeInformation = true;
    this.speicherService.setHideSavePageInformation(this.showSavePageInformation);
  }

  /** Daten von der Datenbank laden */
  //Die Liste wird mit den gespeicherten Daten geladen
  //Fall die Liste leer ist, wird eine entsprechende Nachricht angezeigt
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

  /**Funktionen der kompletten Liste */
  //Die Liste kann durch die Methode, über eine Sicherheitsabfrage, komplett geleert werden
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

  //Diese Methode ändert die RIchtung der Sortierung (auf-/absteigende)
  async sortList(){
    this.weatherlist.reverse();
  }

  /** Navigation zu Detailansicht */
  //Wenn auf ein Wetter gelickt wird, wird eine neue View aufgerufen, welche die Detailansicht lädt
  async onClicked(weather: WeatherDataModel){
    this.speicherService.setCurrentSelectedWeather(weather);
    this.route.navigate(['detailview']);
  }


  /** Löschen einzelner Daten */
  // Über einen Swipe kann das geswipte Wetter gelöscht werden
  // Nur durch Bestätigung in der Sicherheitsabfrage möglich!
  async onLoeschen(weather: WeatherDataModel, slider: IonItemSliding){
    await this.deleteAlert(weather, slider);
  }

  //Alert, welche die Sicherheitsabfrage für ein einzelnes Wetter aufbaut
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

  //Das Datum wird in ein valides (für einen Menschen leserliches) transformiert
  private convertDate(datenumber: number): string{
    const date = new Date().setTime(datenumber);
    return this.datepipe.transform(date, 'dd.MM.yyyy HH:mm');
  }
}
