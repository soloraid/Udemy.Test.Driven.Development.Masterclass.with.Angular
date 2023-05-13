import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HomesComponent} from './components/homes/homes.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataService} from './components/services/data.service';

xdescribe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,HttpClientTestingModule
      ],
      declarations: [
        AppComponent, HeaderComponent,HomesComponent
      ],
      providers: [DataService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tdd-sample-project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tdd-sample-project');
  });
});
