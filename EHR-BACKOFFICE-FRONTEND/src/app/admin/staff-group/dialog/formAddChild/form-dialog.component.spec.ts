import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddChilsComponent } from './form-AddChild.component';

describe('FormDialogComponent', () => {
  let component: FormAddChilsComponent;
  let fixture: ComponentFixture<FormAddChilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormAddChilsComponent]
    });
    fixture = TestBed.createComponent(FormAddChilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
