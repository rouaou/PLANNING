import { TestBed } from '@angular/core/testing';

import { StaffGroupService } from './staff-group.service';

describe('StaffGroupService', () => {
  let service: StaffGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
