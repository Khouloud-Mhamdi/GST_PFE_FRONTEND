import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolleyballPageComponent } from './volleyball-page.component';

describe('VolleyballPageComponent', () => {
  let component: VolleyballPageComponent;
  let fixture: ComponentFixture<VolleyballPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolleyballPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolleyballPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
