import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneEventComponent } from './one-event.component';

describe('OneEventComponent', () => {
  let component: OneEventComponent;
  let fixture: ComponentFixture<OneEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
