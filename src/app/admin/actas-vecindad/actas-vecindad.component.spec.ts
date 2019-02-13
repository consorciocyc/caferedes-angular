import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActasVecindadComponent } from './actas-vecindad.component';

describe('ActasVecindadComponent', () => {
  let component: ActasVecindadComponent;
  let fixture: ComponentFixture<ActasVecindadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActasVecindadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActasVecindadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
