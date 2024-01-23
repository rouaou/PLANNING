import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysesAddEditComponent } from './analyses-add-edit.component';

describe('AnalysesAddEditComponent', () => {
  let component: AnalysesAddEditComponent;
  let fixture: ComponentFixture<AnalysesAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysesAddEditComponent]
    });
    fixture = TestBed.createComponent(AnalysesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
