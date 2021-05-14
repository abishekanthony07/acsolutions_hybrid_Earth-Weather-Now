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
  
  //get Data for city (zip also allowed) (with [stateCode] or [CountryCode])
  //all params can be set AND the described sequence is the sequence for the params!
  //if param not needed set it to ""
  //request only successful if city or zip code is valid
  public getData(city:string, stateCode: string, countryCode: string, successful: any, failed: any): boolean {
    if(city !== undefined && city !== ""){
      let serverUrl = this.getServerUrl(city, stateCode, countryCode)
     
     this.httpClient.get(serverUrl)
                    .subscribe((httpResponse:any) => {successful(httpResponse)}, 
                    (failure: HttpErrorResponse) => {
                        switch(failure.status){
                          case 400:{
                            failed("Ungültige Suchanfrage!", "Überprüfen Sie bitte Ihre Eingaben.")
                            break;
                          }
                          case 401:{
                            failed("Ungültige Authentifizierung!", "Eine Authentifizierung ist erforderlich.")
                            break;
                          }
                          case 403:{
                            failed("Verboten!", "Es sind keine Zugriffsrechte auf den Inhalt vorhanden.")
                            break;
                          }
                          case 404:{
                            failed("Nichts gefunden!", "Für Ihre Suchanfrage konnte nichts gefunden werden.")
                            break;
                          }
                          case 409:{
                            failed("Konflikt!", "Bitte versuchen Sie es später nocheinmal.")
                            break;
                          }
                          case 429:{
                            failed("Zu viele Anfragen!", "Bitte versuchen Sie es später nocheinmal.")
                            break;
                          }
                          default:{
                            failed(`Status-code: ${failure.status}`, failure.message)
                            break;
                          }
                        }
                  })
                    
      return true
    }else{
      return false
    }
  };

  private getServerUrl(city:string, stateCode: string, countryCode: string): string{
    var searchRequest = "q="
    searchRequest = this.setUpSearchRequest(searchRequest, city)
    searchRequest = this.setUpSearchRequest(searchRequest, stateCode)
    searchRequest = this.setUpSearchRequest(searchRequest, countryCode)

    return this.SERVERLINK + searchRequest + this.APIKEY
  }

  //Add Values to searchRequest-String if the value is valid!
  private setUpSearchRequest(searchRequest: string, value: string): string{
    if (value !== undefined && value !== ""){
      if(searchRequest !== "q="){
        searchRequest += ","
      }
      searchRequest += value
    }
    return searchRequest;
  }
}
