import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffGroupListComponent } from './staff-group-list.component';

describe('StaffGroupListComponent', () => {
  let component: StaffGroupListComponent;
  let fixture: ComponentFixture<StaffGroupListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffGroupListComponent]
    });
    fixture = TestBed.createComponent(StaffGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
