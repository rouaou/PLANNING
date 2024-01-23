import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApointmentAdminListComponent } from './apointment-admin-list.component';

describe('ApointmentAdminListComponent', () => {
  let component: ApointmentAdminListComponent;
  let fixture: ComponentFixture<ApointmentAdminListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApointmentAdminListComponent]
    });
    fixture = TestBed.createComponent(ApointmentAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
