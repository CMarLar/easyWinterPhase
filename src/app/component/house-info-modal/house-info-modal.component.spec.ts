import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseInfoModalComponent } from './house-info-modal.component';

describe('HouseInfoModalComponent', () => {
  let component: HouseInfoModalComponent;
  let fixture: ComponentFixture<HouseInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
