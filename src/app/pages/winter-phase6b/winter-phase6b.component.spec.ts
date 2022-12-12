import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinterPhase6bComponent } from './winter-phase6b.component';

describe('WinterPhase6bComponent', () => {
  let component: WinterPhase6bComponent;
  let fixture: ComponentFixture<WinterPhase6bComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinterPhase6bComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinterPhase6bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
