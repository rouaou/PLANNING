import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccListComponent } from './vacc-list.component';

describe('VaccListComponent', () => {
  let component: VaccListComponent;
  let fixture: ComponentFixture<VaccListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccListComponent]
    });
    fixture = TestBed.createComponent(VaccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
