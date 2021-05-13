import { Component } from '@angular/core';
import { WeatherService } from '../api/weather.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private httpClient: HttpClient) {}

  async getData() {
    new WeatherService(this.httpClient).getData("10117", "", "")
  }

}
