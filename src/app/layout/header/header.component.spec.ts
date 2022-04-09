import { TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateStore } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';

const BASE_MODULES = [
  TranslateModule.forRoot()
];
const MATERIAL_MODULES = [
  MatButtonToggleModule,
  MatIconModule
];

describe('HeaderComponent', () =>
{
  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        ...MATERIAL_MODULES,
        ...BASE_MODULES
      ],
      providers: [
        TranslateStore
      ]
    }).compileComponents();
  });

  it('should create HeaderComponent', () =>
  {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should go to home when click on home icon', () =>
  {

    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    const href = fixture.debugElement.query(By.css('.a-home-icon')).nativeElement
      .getAttribute('ng-reflect-router-link');

    expect(href).toEqual('/home');
  });

  it('should call changeLanguage when click on language icons', () =>
  {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    const spy = spyOn(component, 'changeLanguage');

    const button = fixture.debugElement.nativeElement.querySelector('.mat-button-toggle-group');

    button.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalled();

  });
});


