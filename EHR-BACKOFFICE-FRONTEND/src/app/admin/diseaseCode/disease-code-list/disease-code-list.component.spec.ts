import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseCodeListComponent } from './disease-code-list.component';

describe('DiseaseCodeListComponent', () => {
  let component: DiseaseCodeListComponent;
  let fixture: ComponentFixture<DiseaseCodeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiseaseCodeListComponent]
    });
    fixture = TestBed.createComponent(DiseaseCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
