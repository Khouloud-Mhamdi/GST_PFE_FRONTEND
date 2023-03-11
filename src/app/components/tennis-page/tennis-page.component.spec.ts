import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisPageComponent } from './tennis-page.component';

describe('TennisPageComponent', () => {
  let component: TennisPageComponent;
  let fixture: ComponentFixture<TennisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TennisPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TennisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
