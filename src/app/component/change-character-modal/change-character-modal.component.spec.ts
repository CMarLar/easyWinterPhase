import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCharacterModalComponent } from './change-character-modal.component';

describe('ChangeCharacterModalComponent', () => {
  let component: ChangeCharacterModalComponent;
  let fixture: ComponentFixture<ChangeCharacterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCharacterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCharacterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
