import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffsListComponent } from './staffs-list.component';

describe('StaffsListComponent', () => {
  let component: StaffsListComponent;
  let fixture: ComponentFixture<StaffsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffsListComponent]
    });
    fixture = TestBed.createComponent(StaffsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
