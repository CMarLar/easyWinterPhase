import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhase4Component } from './winter-phase4.component';

describe('WinterPhase4Component', () => {
  let component: WinterPhase4Component;
  let fixture: ComponentFixture<WinterPhase4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhase4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhase4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
