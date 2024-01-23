import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseAddEditComponent } from './disease-add-edit.component';

describe('DiseaseAddEditComponent', () => {
  let component: DiseaseAddEditComponent;
  let fixture: ComponentFixture<DiseaseAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiseaseAddEditComponent]
    });
    fixture = TestBed.createComponent(DiseaseAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
