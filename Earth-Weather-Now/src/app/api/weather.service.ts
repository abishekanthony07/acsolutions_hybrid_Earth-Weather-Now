import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  readonly serverLink = 'https://api.openweathermap.org/data/2.5/weather?';
  readonly apikey = '&appid=5e385bd366870fdc62782035ab913c73';

  constructor(private httpClient: HttpClient) {
  }

  //get Data for city (zip also allowed) (with [stateCode] or [CountryCode])
  //all params can be set AND the described sequence is the sequence for the params!
  //if param not needed set it to ""
  //request only successful if city or zip code is valid
  public getData(home: any, successful: any, failed: any): boolean {
    if (home.city !== undefined && home.city !== '') {
      const serverUrl = this.getServerUrl(home.city, home.stateCode, home.countryCode);

      this.httpClient.get(serverUrl)
        .subscribe((httpResponse: any) => {
            successful(home, httpResponse);
          },
          (failure: HttpErrorResponse) => {
            WeatherService.handleResponseCode(home, failure.status, failed);
          });
      return true;
    } else {
      return false;
    }
  };

  //Diese Methode baut die Server-URL zusammen
  private getServerUrl(city: string, stateCode: string, countryCode: string): string {
    let searchRequest = 'q=';
    searchRequest = WeatherService.setUpSearchRequest(searchRequest, city);
    searchRequest = WeatherService.setUpSearchRequest(searchRequest, stateCode);
    searchRequest = WeatherService.setUpSearchRequest(searchRequest, countryCode);

    return this.serverLink + searchRequest + this.apikey;
  }

  //Es werden Standard-Fehlermeldung für bestimmte HTTP-Error codes spezifiziert.
  private static handleResponseCode(home: any, code: number, failed: any) {
    switch (code) {
      case 400: {
        failed(home, 'Ungültige Suchanfrage!', 'Überprüfen Sie bitte Ihre Eingaben.');
        break;
      }
      case 401: {
        failed(home, 'Ungültige Authentifizierung!', 'Eine Authentifizierung ist erforderlich.');
        break;
      }
      case 403: {
        failed(home, 'Verboten!', 'Es sind keine Zugriffsrechte auf den Inhalt vorhanden.');
        break;
      }
      case 404: {
        failed(home, 'Nichts gefunden!', 'Für Ihre Suchanfrage konnte nichts gefunden werden.');
        break;
      }
      case 409: {
        failed(home, 'Konflikt!', 'Bitte versuchen Sie es später nocheinmal.');
        break;
      }
      case 429: {
        failed(home, 'Zu viele Anfragen!', 'Bitte versuchen Sie es später nocheinmal.');
        break;
      }
      default: {
        failed(home, `Status-code: ${code}`, 'Bitte versuchen Sie es später nocheinmal.');
        break;
      }
    }
  }

  //Add Values to searchRequest-String if the value is valid!
  private static setUpSearchRequest(searchRequest: string, value: string): string {
    if (value !== undefined && value !== '') {
      if (searchRequest !== 'q=') {
        searchRequest += ',';
      }
      searchRequest += value;
    }
    return searchRequest;
  }
}
