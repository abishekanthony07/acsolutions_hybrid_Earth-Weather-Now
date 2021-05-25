import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaveListPage } from './save-list.page';

describe('SaveListPage', () => {
  let component: SaveListPage;
  let fixture: ComponentFixture<SaveListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaveListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
