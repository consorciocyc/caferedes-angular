import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SublineComponent } from './subline.component';

describe('SublineComponent', () => {
  let component: SublineComponent;
  let fixture: ComponentFixture<SublineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SublineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SublineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
