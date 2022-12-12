import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlayerNameModalComponent } from './new-player-name-modal.component';

describe('NewPlayerNameModalComponent', () => {
  let component: NewPlayerNameModalComponent;
  let fixture: ComponentFixture<NewPlayerNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPlayerNameModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPlayerNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
