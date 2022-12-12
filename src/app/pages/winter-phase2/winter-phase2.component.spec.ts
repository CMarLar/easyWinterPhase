import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhase2Component } from './winter-phase2.component';

describe('WinterPhase2Component', () => {
  let component: WinterPhase2Component;
  let fixture: ComponentFixture<WinterPhase2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhase2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhase2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
