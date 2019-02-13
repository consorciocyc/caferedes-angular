import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispachMovementsComponent } from './dispatch-movements.component';

describe('DispachMovementsComponent', () => {
  let component: DispachMovementsComponent;
  let fixture: ComponentFixture<DispachMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispachMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispachMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
