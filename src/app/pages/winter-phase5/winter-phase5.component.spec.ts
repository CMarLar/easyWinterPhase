import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhase5Component } from './winter-phase5.component';

describe('WinterPhase5Component', () => {
  let component: WinterPhase5Component;
  let fixture: ComponentFixture<WinterPhase5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhase5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhase5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
