import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationAddEditComponent } from './vaccination-add-edit.component';

describe('VaccinationAddEditComponent', () => {
  let component: VaccinationAddEditComponent;
  let fixture: ComponentFixture<VaccinationAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinationAddEditComponent]
    });
    fixture = TestBed.createComponent(VaccinationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
