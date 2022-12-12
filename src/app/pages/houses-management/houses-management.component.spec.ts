import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesManagementComponent } from './houses-management.component';

describe('HousesManagementComponent', () => {
  let component: HousesManagementComponent;
  let fixture: ComponentFixture<HousesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousesManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
