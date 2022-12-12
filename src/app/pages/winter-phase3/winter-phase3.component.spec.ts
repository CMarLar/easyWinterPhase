import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhase3Component } from './winter-phase3.component';

describe('WinterPhase3Component', () => {
  let component: WinterPhase3Component;
  let fixture: ComponentFixture<WinterPhase3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhase3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhase3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
