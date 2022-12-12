import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhase1Component } from './winter-phase1.component';

describe('WinterPhase1Component', () => {
  let component: WinterPhase1Component;
  let fixture: ComponentFixture<WinterPhase1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhase1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhase1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
