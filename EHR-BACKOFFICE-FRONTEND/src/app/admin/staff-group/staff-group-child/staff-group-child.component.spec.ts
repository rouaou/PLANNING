import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffGroupChildComponent } from './staff-group-child.component';

describe('StaffGroupChildComponent', () => {
  let component: StaffGroupChildComponent;
  let fixture: ComponentFixture<StaffGroupChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffGroupChildComponent]
    });
    fixture = TestBed.createComponent(StaffGroupChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
