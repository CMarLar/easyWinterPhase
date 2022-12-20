import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhase9Component } from './winter-phase9.component';

describe('WinterPhase9Component', () => {
  let component: WinterPhase9Component;
  let fixture: ComponentFixture<WinterPhase9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhase9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhase9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
