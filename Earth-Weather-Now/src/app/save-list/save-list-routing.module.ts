import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveListPage } from './save-list.page';

const routes: Routes = [
  {
    path: '',
    component: SaveListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveListPageRoutingModule {}
