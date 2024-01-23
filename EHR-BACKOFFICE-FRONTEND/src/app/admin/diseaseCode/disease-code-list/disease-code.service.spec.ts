import { TestBed } from '@angular/core/testing';

import { DiseaseCodeService } from './disease-code.service';

describe('DiseaseCodeService', () => {
  let service: DiseaseCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiseaseCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
