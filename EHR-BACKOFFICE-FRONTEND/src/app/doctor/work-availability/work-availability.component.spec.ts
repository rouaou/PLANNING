import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAvailabilityComponent } from './work-availability.component';

describe('WorkAvailabilityComponent', () => {
  let component: WorkAvailabilityComponent;
  let fixture: ComponentFixture<WorkAvailabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkAvailabilityComponent]
    });
    fixture = TestBed.createComponent(WorkAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
