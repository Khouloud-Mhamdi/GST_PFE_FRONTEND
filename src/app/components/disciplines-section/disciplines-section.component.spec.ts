import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinesSectionComponent } from './disciplines-section.component';

describe('DisciplinesSectionComponent', () => {
  let component: DisciplinesSectionComponent;
  let fixture: ComponentFixture<DisciplinesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplinesSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisciplinesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
