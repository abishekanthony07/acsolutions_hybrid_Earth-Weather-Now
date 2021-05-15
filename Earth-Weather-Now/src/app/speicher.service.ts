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

  getHideInformation(): Promise<boolean> {
    return this.storage.get('showHomeInformation')
  }
}
