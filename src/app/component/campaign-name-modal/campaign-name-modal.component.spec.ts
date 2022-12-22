import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignNameModalComponent } from './campaign-name-modal.component';

describe('CampaignNameModalComponent', () => {
  let component: CampaignNameModalComponent;
  let fixture: ComponentFixture<CampaignNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignNameModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
