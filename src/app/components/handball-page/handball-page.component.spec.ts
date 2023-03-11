import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandballPageComponent } from './handball-page.component';

describe('HandballPageComponent', () => {
  let component: HandballPageComponent;
  let fixture: ComponentFixture<HandballPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandballPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandballPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
