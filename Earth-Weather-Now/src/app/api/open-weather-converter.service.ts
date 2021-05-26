import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherConverterService {

  constructor() {
  }

  public static checkValueExists(value: any, defaultValue: any): any {
    if (value) {
      return value;
    }
    return defaultValue;
  }

  public static convertTemp(kelvin): string {
    return (kelvin - 273.15).toFixed(0);
  }

  public static convertDate(seconds): string {
    return new Date(seconds * 1000).toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  public static convertDescripton(description: any, date: number): string {
    switch (description) {
      case 'clear sky': {
        if (this.isDayTime(date)) {
          return '../../assets/wetter/sonne/sonne.png';
        } else {
          return '../../assets/wetter/nacht/mond.png';
        }
      }
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds': {
        if (this.isDayTime(date)) {
          return '../../assets/wetter/wolken/sonnenwolken.png';
        } else {
          return '../../assets/wetter/wolken/mondwolken.png';
        }
      }
      case 'shower rain':
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'extreme rain':
      case 'light intensity shower rain':
      case 'heavy intensity shower rain':
      case 'ragged shower rain':
      case 'rain': {
        return '../../assets/wetter/wolken/regen.png';
      }
      case 'light rain': {
        return '../../assets/wetter/wolken/regenbogen.png';
      }
      case 'freezing rain': {
        return '../../assets/wetter/wolken/hagel.png';
      }
      case 'thunderstorm with light rain':
      case 'thunderstorm with rain':
      case 'thunderstorm with heavy rain': {
        return '../../assets/wetter/gewitter/regengewitter.png';
      }
      case 'light thunderstorm':
      case 'heavy thunderstorm':
      case 'ragged thunderstorm':
      case 'thunderstorm with light drizzle':
      case 'thunderstorm with drizzle':
      case 'thunderstorm with heavy drizzle':
      case 'thunderstorm': {
        return '../../assets/wetter/gewitter/gewitter.png';
      }
      case 'light snow':
      case 'snow':
      case 'heavy snow':
      case 'sleet':
      case 'light shower sleet':
      case 'shower sleet':
      case 'light rain and snow':
      case 'rain and snow':
      case 'light shower snow':
      case 'shower snow':
      case 'heavy shower snow': {
        return '../../assets/wetter/wolken/schnee.png';
      }
      case 'mist':
      case 'Smoke':
      case 'Haze':
      case 'sand/ dust whirls':
      case 'fog':
      case 'sand':
      case 'dust':
      case 'volcanic ash':
      case 'squalls': {
        return '../../assets/wetter/windig/windig.png';
      }
      case 'tornado': {
        return '../../assets/wetter/tornado/tornado.png';
      }
      default: {
        return '../../assets/wetter/sonne/sonne.png';
      }
    }
  }

  public static isDayTime(date: number): boolean {
    const hours = new Date(date).getHours();
    return hours > 6 && hours < 20;
  }
}
