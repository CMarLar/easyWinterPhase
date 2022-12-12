import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNpcToHouseComponent } from './add-npc-to-house.component';

describe('AddNpcToHouseComponent', () => {
  let component: AddNpcToHouseComponent;
  let fixture: ComponentFixture<AddNpcToHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNpcToHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNpcToHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
