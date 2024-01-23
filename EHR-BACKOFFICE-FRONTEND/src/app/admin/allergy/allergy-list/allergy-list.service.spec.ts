import { TestBed } from '@angular/core/testing';

import { AllergyListService } from './allergy-list.service';

describe('AllergyListService', () => {
  let service: AllergyListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllergyListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
