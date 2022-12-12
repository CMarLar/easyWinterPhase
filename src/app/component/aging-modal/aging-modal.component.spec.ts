import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingModalComponent } from './aging-modal.component';

describe('AgingModalComponent', () => {
  let component: AgingModalComponent;
  let fixture: ComponentFixture<AgingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
