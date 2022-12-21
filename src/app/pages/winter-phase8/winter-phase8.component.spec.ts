import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhase8Component } from './winter-phase8.component';

describe('WinterPhase8Component', () => {
  let component: WinterPhase8Component;
  let fixture: ComponentFixture<WinterPhase8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhase8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhase8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
