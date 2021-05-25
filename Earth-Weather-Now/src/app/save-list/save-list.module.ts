import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveListPageRoutingModule } from './save-list-routing.module';

import { SaveListPage } from './save-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaveListPageRoutingModule
  ],
  declarations: [SaveListPage]
})
export class SaveListPageModule {}
