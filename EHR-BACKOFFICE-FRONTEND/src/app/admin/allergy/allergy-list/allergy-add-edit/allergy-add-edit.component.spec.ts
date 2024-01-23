import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyAddEditComponent } from './allergy-add-edit.component';

describe('AllergyAddEditComponent', () => {
  let component: AllergyAddEditComponent;
  let fixture: ComponentFixture<AllergyAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllergyAddEditComponent]
    });
    fixture = TestBed.createComponent(AllergyAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
