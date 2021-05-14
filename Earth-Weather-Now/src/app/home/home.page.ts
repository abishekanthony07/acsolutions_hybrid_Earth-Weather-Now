import { Component } from '@angular/core';
import { WeatherService } from '../api/weather.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

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

  constructor(private httpClient: HttpClient) {
    this.erweiterteSuche = false
  }

  async getData() {
    new WeatherService(this.httpClient).getData(this.city, this.stateCode, this.laenderCode);
  }

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
