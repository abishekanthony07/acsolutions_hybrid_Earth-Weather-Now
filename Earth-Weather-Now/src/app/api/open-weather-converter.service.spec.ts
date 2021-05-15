import { TestBed } from '@angular/core/testing';

import { OpenWeatherConverterService } from './open-weather-converter.service';

describe('OpenWeatherConverterService', () => {
  let service: OpenWeatherConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenWeatherConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
