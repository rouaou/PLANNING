import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioAnalysesListComponent } from './bio-analyses-list.component';

describe('BioAnalysesListComponent', () => {
  let component: BioAnalysesListComponent;
  let fixture: ComponentFixture<BioAnalysesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BioAnalysesListComponent]
    });
    fixture = TestBed.createComponent(BioAnalysesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
