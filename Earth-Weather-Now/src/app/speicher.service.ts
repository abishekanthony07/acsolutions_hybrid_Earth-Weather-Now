import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import { WeatherDataModel } from './model/WeatherDataModel';

@Injectable({
  providedIn: 'root'
})
export class SpeicherService {

  constructor(private storage: Storage) {
  }

  //Das angeklickte Wetter durch den Benutzer in der Liste aller gespeicherten Wetterdaten, 
  //wird durch diese Methode zwischengespeichert
  setCurrentSelectedWeather(weather: WeatherDataModel){
    this.storage.set('currentSelectedWeather', weather.jsonResult);
  };

  //Ob die Infobox der Startseite für immer nicht mehr angezeigt werden soll, wird durch
  //diese Methode für immer gespeichert
  setHideInformation(value: boolean){
    this.storage.set('showHomeInformation', value);
  }

  //Ob die Infobox der Liste mit allen gespeicherten Wetterdaten 
  //für immer nicht mehr angezeigt werden soll, wird durch
  //diese Methode für immer gespeichert
  setHideSavePageInformation(value: boolean){
    this.storage.set('showSavePageInformation', value);
  }

  //Diese Methode ist für das Speichern, eines Wetters zuständig
  saveSearch(model: WeatherDataModel, kommentar: string, sucheingabe: any){
    const currentdate = String(model.date);
    const result = {
      result: model.jsonResult,
      comment: kommentar,
      search: sucheingabe,
      currentDate: currentdate
    };
    this.storage.set(currentdate, result);
  }

  //Diese Methode holt alle gespeicherten Wetterdaten
  getSearchList(): any{
      const items = [];
      return this.storage.forEach((v,k,i) => {
        if(this.getBoolForOnlySavedList(k)){
          items.push(v);
        }
      }).then(() => items);
  }

  //Durch diese Methode kann ein Wetter gelöscht werden
  //Das Datum vom Wetter ist der eindeutige Schlüssel
  deleteSearchItem(keyDate: string){
    this.storage.remove(keyDate);
  }

  //Das zwischengespeicherte Wetter, welches für die Detailansicht benötigt wird
  //wird durch diese Methode geholt
  async getCurrentSelectedWeather(): Promise<WeatherDataModel>{
    const json  = await this.storage.get('currentSelectedWeather');
    return WeatherDataModel.convertSavedJson(json);
  };

  //Hier wird das Boolean, ob die Infobox angezeigt werden darf, für die Startseite geholt
  getHideInformation(): Promise<boolean> {
    return this.storage.get('showHomeInformation');
  }

  //Hier wird das Boolean, ob die Infobox angezeigt werden darf, für die Listenansicht aller
  //Wetterdaten geholt
  getHideSavePageInformation(): Promise<boolean> {
    return this.storage.get('showSavePageInformation');
  }

  //Da ein Key-Value-Storage in dieser Klasse verwendet wird
  //Wird durch diese Methode überprüft, ob der Key ein Datum ist, 
  //Damit die korrekten Daten zum Anzeigen aller Wetterdaten geladen werden
  private getBoolForOnlySavedList(storagekey: string): boolean {
    return storagekey !== 'showHomeInformation' && storagekey !== 'showSavePageInformation' && storagekey !== 'currentSelectedWeather';
  }
}
