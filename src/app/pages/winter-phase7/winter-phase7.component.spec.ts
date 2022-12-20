import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhase7Component } from './winter-phase7.component';

describe('WinterPhase7Component', () => {
  let component: WinterPhase7Component;
  let fixture: ComponentFixture<WinterPhase7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhase7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhase7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
