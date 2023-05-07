import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionTerrainReservationComponent } from './selection-terrain-reservation.component';

describe('SelectionTerrainReservationComponent', () => {
  let component: SelectionTerrainReservationComponent;
  let fixture: ComponentFixture<SelectionTerrainReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionTerrainReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionTerrainReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
