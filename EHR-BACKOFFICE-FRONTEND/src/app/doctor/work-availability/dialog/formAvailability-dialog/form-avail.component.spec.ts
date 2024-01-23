import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormAvailDialogComponent } from './form-avail.component';


describe('FormDialogComponent', () => {
  let component: FormAvailDialogComponent;
  let fixture: ComponentFixture<FormAvailDialogComponent>;

  beforeEach(() => {   
    TestBed.configureTestingModule({
      declarations: [FormAvailDialogComponent]
    });
    fixture = TestBed.createComponent(FormAvailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
