import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageCourtesyModalComponent } from './marriage-courtesy-modal.component';

describe('MarriageCourtesyModalComponent', () => {
  let component: MarriageCourtesyModalComponent;
  let fixture: ComponentFixture<MarriageCourtesyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarriageCourtesyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarriageCourtesyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
