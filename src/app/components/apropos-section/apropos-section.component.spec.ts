import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproposSectionComponent } from './apropos-section.component';

describe('AproposSectionComponent', () => {
  let component: AproposSectionComponent;
  let fixture: ComponentFixture<AproposSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AproposSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AproposSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
