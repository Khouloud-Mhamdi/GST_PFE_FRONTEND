import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaratePageComponent } from './karate-page.component';

describe('KaratePageComponent', () => {
  let component: KaratePageComponent;
  let fixture: ComponentFixture<KaratePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaratePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KaratePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
