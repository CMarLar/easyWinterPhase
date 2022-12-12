import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthsModalComponent } from './births-modal.component';

describe('BirthsModalComponent', () => {
  let component: BirthsModalComponent;
  let fixture: ComponentFixture<BirthsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
