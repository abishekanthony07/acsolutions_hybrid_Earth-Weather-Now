import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SpeicherService {

  constructor(private storage: Storage) {

  }

  setHideInformation(value: boolean){
    this.storage.set('showHomeInformation', value);
  }

  saveSearch(jsonResult: any){
    const currentdate = new Date().getMilliseconds.toString();
    this.storage.set(currentdate, jsonResult);
  }

  getSearchList(): any{
      const items = [];
      return this.storage.forEach((v,k,i) => {
        if(k !== 'showHomeInformation'){
          items.push(JSON.parse(v));
        }
      }).then(() => items);
  }

  getHideInformation(): Promise<boolean> {
    return this.storage.get('showHomeInformation')
  }
}
