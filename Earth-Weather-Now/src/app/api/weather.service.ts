import { isEmptyExpression } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  readonly SERVERLINK = "https://api.openweathermap.org/data/2.5/weather?"
  readonly APIKEY = "&appid=5e385bd366870fdc62782035ab913c73";
  readonly OPTIONS_OBJECT: object = { observe: "response"}

  constructor(private httpClient: HttpClient) {}
  
  //get Data for city, stateCode or CountryCode
  //all params can be set AND the described sequence is the sequence for the params!
  //if param not needed set it to ""
  public getData(city:string, stateCode: string, countryCode: string) {
    if(city !== "" || stateCode !== "" || countryCode !== ""){
      let serverUrl = this.getServerUrl(city, stateCode, countryCode)
     
     this.httpClient.get(serverUrl)
                    .subscribe(this.validateSuccess, this.validateFailed)
    }else{
      //Error: Please enter valid Data
    }
  };

  private validateSuccess = (httpResponse:any) => {
    	console.log(httpResponse)
  }

  private validateFailed = (failure: HttpErrorResponse) => {
    console.log(`Request failed: ${failure.message}`)
  }

  private getServerUrl(city:string, stateCode: string, countryCode: string): string{
    var searchRequest = "q="
    searchRequest = this.setUpSearchRequest(searchRequest, city)
    searchRequest = this.setUpSearchRequest(searchRequest, stateCode)
    searchRequest = this.setUpSearchRequest(searchRequest, countryCode)

    return this.SERVERLINK + searchRequest + this.APIKEY
  }

  //Add Values to searchRequest-String if the value is valid!
  private setUpSearchRequest(searchRequest: string, value: string): string{
    if (value !== ""){
      if(searchRequest !== "q="){
        searchRequest += ","
      }
      searchRequest += value
    }
    return searchRequest;
  }
}
