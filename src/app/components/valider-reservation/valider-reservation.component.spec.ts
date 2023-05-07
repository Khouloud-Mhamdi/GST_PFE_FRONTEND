import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderReservationComponent } from './valider-reservation.component';

describe('ValiderReservationComponent', () => {
  let component: ValiderReservationComponent;
  let fixture: ComponentFixture<ValiderReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiderReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
