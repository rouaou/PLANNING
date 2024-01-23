import { TestBed } from '@angular/core/testing';

import { VaccListService } from './vacc-list.service';

describe('VaccListService', () => {
  let service: VaccListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
