import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPatientDialogComponent } from './form-patient-dialog.component';

describe('FormPatientDialogComponent', () => {
  let component: FormPatientDialogComponent;
  let fixture: ComponentFixture<FormPatientDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPatientDialogComponent]
    });
    fixture = TestBed.createComponent(FormPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
