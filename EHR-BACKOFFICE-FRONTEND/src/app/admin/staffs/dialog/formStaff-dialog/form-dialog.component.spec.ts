import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStaffDialogComponent } from './form-dialog.component';

describe('FormDialogComponent', () => {
  let component: FormStaffDialogComponent;
  let fixture: ComponentFixture<FormStaffDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormStaffDialogComponent]
    });
    fixture = TestBed.createComponent(FormStaffDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
