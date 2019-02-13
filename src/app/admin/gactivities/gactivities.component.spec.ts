import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GactivitiesComponent } from './gactivities.component';

describe('GactivitiesComponent', () => {
  let component: GactivitiesComponent;
  let fixture: ComponentFixture<GactivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GactivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
