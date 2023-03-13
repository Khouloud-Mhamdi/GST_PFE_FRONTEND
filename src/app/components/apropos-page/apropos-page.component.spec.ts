import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproposPageComponent } from './apropos-page.component';

describe('AproposPageComponent', () => {
  let component: AproposPageComponent;
  let fixture: ComponentFixture<AproposPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AproposPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AproposPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
