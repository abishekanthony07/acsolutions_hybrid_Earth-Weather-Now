import {Component} from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Wetter',
      url: '/folder/Startseite',
      icon: 'sun-outline'
    },
    {
      title: 'Wettervorhesage',
      url: '/folder/gespeicherteVorhersage',
      icon: 'list'
    },
  ];

  constructor(
    private menuController: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
  }

  menuSchliessen(){
    this.menuController.close();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
