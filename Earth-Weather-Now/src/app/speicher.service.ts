import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import { WeatherDataModel } from './model/WeatherDataModel';

@Injectable({
  providedIn: 'root'
})
export class SpeicherService {

  constructor(private storage: Storage) {
  }

  setCurrentSelectedWeather(weather: WeatherDataModel){
    this.storage.set('currentSelectedWeather', weather.jsonResult);
  };

  setHideInformation(value: boolean){
    this.storage.set('showHomeInformation', value);
  }

  setHideSavePageInformation(value: boolean){
    this.storage.set('showSavePageInformation', value);
  }


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

  getSearchList(): any{
      const items = [];
      return this.storage.forEach((v,k,i) => {
        if(this.getBoolForOnlySavedList(k)){
          items.push(v);
        }
      }).then(() => items);
  }

  deleteSearchItem(keyDate: string){
    this.storage.remove(keyDate);
  }

  async getCurrentSelectedWeather(): Promise<WeatherDataModel>{
    const json  = await this.storage.get('currentSelectedWeather');
    return WeatherDataModel.convertSavedJson(json);
  };

  getHideInformation(): Promise<boolean> {
    return this.storage.get('showHomeInformation');
  }

  getHideSavePageInformation(): Promise<boolean> {
    return this.storage.get('showSavePageInformation');
  }

  private getBoolForOnlySavedList(storagekey: string): boolean {
    return storagekey !== 'showHomeInformation' && storagekey !== 'showSavePageInformation' && storagekey !== 'currentSelectedWeather';
  }
}
