import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAvailComponent } from './edit-avail.component';


describe('EditStaffComponent', () => {
  let component: EditAvailComponent;
  let fixture: ComponentFixture<EditAvailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAvailComponent]
    });
    fixture = TestBed.createComponent(EditAvailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
