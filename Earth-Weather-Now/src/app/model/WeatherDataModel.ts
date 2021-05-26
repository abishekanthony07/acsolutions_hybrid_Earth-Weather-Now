import { OpenWeatherConverterService } from '../api/open-weather-converter.service';

export class WeatherDataModel {

    //Fields
    wetterBildSource = '../../assets/wetter/sonne/sonne.png';
    cityName: string;
    laenderCode: string;
    coordsLon: string;
    coordsLat: string;
    currentTemp: string;
    feelsLike: string;
    minTemp: string;
    maxTemp: string;
    humidity: number;
    rain: number;
    wind: number;
    pressure: number;
    visibility: number;
    timezone: string;
    sunrise: string;
    sunset: string;
    date: number;
    comment: string;
    jsonResult: any;

    constructor(
        jsonResult: any
        ){
            this.date = new Date().getTime();
            this. wetterBildSource = OpenWeatherConverterService.convertDescripton(jsonResult.weather[0].description, this.date);
            this.cityName = jsonResult.name;
            this.laenderCode = jsonResult.sys.country;
            this.coordsLon = jsonResult.coord.lon;
            this.coordsLat = jsonResult.coord.lat;
            this.currentTemp = OpenWeatherConverterService.convertTemp(jsonResult.main.temp);
            this.feelsLike = OpenWeatherConverterService.convertTemp(jsonResult.main.feels_like);
            this.minTemp = OpenWeatherConverterService.convertTemp(jsonResult.main.temp_min);
            this.maxTemp = OpenWeatherConverterService.convertTemp(jsonResult.main.temp_max);
            this.humidity = jsonResult.main.humidity;
            this.rain = OpenWeatherConverterService.checkValueExists(jsonResult.rain, {'1h': 0.00})['1h'] * 100;
            this.wind = OpenWeatherConverterService.checkValueExists(jsonResult.wind, {speed: '---'}).speed;
            this.pressure = jsonResult.main.pressure;
            this.visibility = jsonResult.visibility / 1000;
            this.timezone = OpenWeatherConverterService.convertDate(jsonResult.timezone / 1000).substring(0, 2);
            this.sunrise = OpenWeatherConverterService.convertDate(jsonResult.sys.sunrise).substring(0, 5);
            this.sunset = OpenWeatherConverterService.convertDate(jsonResult.sys.sunset).substring(0, 5);
            this.jsonResult = jsonResult;
    }

    public static convertSavedJson(json: any): WeatherDataModel{
        const weather = new WeatherDataModel(json.result);
        weather.date = json.currentDate;
        weather.comment = json.comment;
        return weather;
    }
}
