import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsTableComponent } from './requests-table.component';

describe('RequestsTableComponent', () => {
  let component: RequestsTableComponent;
  let fixture: ComponentFixture<RequestsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsTableComponent]
    });
    fixture = TestBed.createComponent(RequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
