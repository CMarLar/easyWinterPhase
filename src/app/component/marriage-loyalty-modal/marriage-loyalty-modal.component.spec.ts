import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageLoyaltyModalComponent } from './marriage-loyalty-modal.component';

describe('MarriageLoyaltyModalComponent', () => {
  let component: MarriageLoyaltyModalComponent;
  let fixture: ComponentFixture<MarriageLoyaltyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarriageLoyaltyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarriageLoyaltyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
