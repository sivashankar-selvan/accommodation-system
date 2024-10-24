import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFurnitureComponent } from './popup-furniture.component';

describe('PopupFurnitureComponent', () => {
  let component: PopupFurnitureComponent;
  let fixture: ComponentFixture<PopupFurnitureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupFurnitureComponent]
    });
    fixture = TestBed.createComponent(PopupFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
