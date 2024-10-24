import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRequestFormComponent } from './hr-request-form.component';

describe('HrRequestFormComponent', () => {
  let component: HrRequestFormComponent;
  let fixture: ComponentFixture<HrRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HrRequestFormComponent]
    });
    fixture = TestBed.createComponent(HrRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
