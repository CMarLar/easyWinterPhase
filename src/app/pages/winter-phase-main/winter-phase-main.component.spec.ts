import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhaseMainComponent } from './winter-phase-main.component';

describe('WinterPhaseMainComponent', () => {
  let component: WinterPhaseMainComponent;
  let fixture: ComponentFixture<WinterPhaseMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhaseMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhaseMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
