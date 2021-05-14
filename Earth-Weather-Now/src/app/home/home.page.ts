import { Component } from '@angular/core';
import { WeatherService } from '../api/weather.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { Storage } from '@ionic/storage';
import { SpeicherService } from '../speicher.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private erweiterteSuche: boolean;
  private city: string;
  private stateCode: string;
  private laenderCode: string;
  private showHomeInformation: boolean = false;
  private closeInformation: boolean = false

  constructor(private httpClient: HttpClient, private speicherservice: SpeicherService) {
    this.erweiterteSuche = false
    this.loadHideInformation()
  }

  async getData() {
    new WeatherService(this.httpClient).getData(this.city, this.stateCode, this.laenderCode);
  }

  /**Information functions */
  async loadHideInformation(){
    this.showHomeInformation = await this.speicherservice.getHideInformation()
    this.closeInformation = this.showHomeInformation
  }

  async closeButtonPressed() {
    this.closeInformation = true
    this.speicherservice.setHideInformation(this.showHomeInformation)
  }

  /** Toolbar functions */
  async onErweitert(){
    this.erweiterteSuche = !this.erweiterteSuche;
    this.resetErweitertValuesIfHidden()
  }

  private resetErweitertValuesIfHidden(){
    if(!this.erweiterteSuche){
      this.stateCode = ""
      this.laenderCode = ""
    }
  }

}
