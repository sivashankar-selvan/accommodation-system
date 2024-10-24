import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomPopupComponent } from './add-room-popup.component';

describe('AddRoomPopupComponent', () => {
  let component: AddRoomPopupComponent;
  let fixture: ComponentFixture<AddRoomPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoomPopupComponent]
    });
    fixture = TestBed.createComponent(AddRoomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
