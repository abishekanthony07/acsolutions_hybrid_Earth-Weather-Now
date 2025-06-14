import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {IonicStorageModule} from '@ionic/storage';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [DatePipe, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
