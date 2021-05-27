import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'save-list',
    loadChildren: () => import('./save-list/save-list.module').then( m => m.SaveListPageModule)
  },
  {
    path: 'detailview',
    loadChildren: () => import('./detailview/detailview.module').then( m => m.DetailviewPageModule)
  },
  {
    path: 'hilfe',
    loadChildren: () => import('./hilfe/hilfe.module').then( m => m.HilfePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
