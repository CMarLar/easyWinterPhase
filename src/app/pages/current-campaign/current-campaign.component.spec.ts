import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCampaignComponent } from './current-campaign.component';

describe('CurrentCampaignComponent', () => {
  let component: CurrentCampaignComponent;
  let fixture: ComponentFixture<CurrentCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentCampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
