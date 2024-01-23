import { TestBed } from '@angular/core/testing';

import { BioAnalysesService } from './bio-analyses.service';

describe('BioAnalysesService', () => {
  let service: BioAnalysesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BioAnalysesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
