import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import { reverse } from 'dns';
import { WeatherDataModel } from './model/WeatherDataModel';

@Injectable({
  providedIn: 'root'
})
export class SpeicherService {

  constructor(private storage: Storage) {

  }

  setHideInformation(value: boolean){
    this.storage.set('showHomeInformation', value);
  }

  saveSearch(model: WeatherDataModel, kommentar: string){
    const currentdate = String(model.date);
    const result = {
      result: model.jsonResult,
      comment: kommentar,
      currentDate: currentdate
    };
    this.storage.set(currentdate, result);
  }

  getSearchList(): any{
      const items = [];
      return this.storage.forEach((v,k,i) => {
        if(k !== 'showHomeInformation'){
          items.push(v);
        }
      }).then(() => items);
  }

  getHideInformation(): Promise<boolean> {
    return this.storage.get('showHomeInformation');
  }
}
