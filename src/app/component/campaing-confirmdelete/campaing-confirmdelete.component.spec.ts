import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingConfirmdeleteComponent } from './campaing-confirmdelete.component';

describe('CampaingConfirmdeleteComponent', () => {
  let component: CampaingConfirmdeleteComponent;
  let fixture: ComponentFixture<CampaingConfirmdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaingConfirmdeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaingConfirmdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
