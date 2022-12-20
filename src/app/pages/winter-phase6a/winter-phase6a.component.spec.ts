import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhase6aComponent } from './winter-phase6a.component';

describe('WinterPhase6aComponent', () => {
  let component: WinterPhase6aComponent;
  let fixture: ComponentFixture<WinterPhase6aComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhase6aComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhase6aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
