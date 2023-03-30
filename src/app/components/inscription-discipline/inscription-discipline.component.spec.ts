import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionDisciplineComponent } from './inscription-discipline.component';

describe('InscriptionDisciplineComponent', () => {
  let component: InscriptionDisciplineComponent;
  let fixture: ComponentFixture<InscriptionDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionDisciplineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
