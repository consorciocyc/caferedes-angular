import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubworktypeComponent } from './subworktype.component';

describe('SubworktypeComponent', () => {
  let component: SubworktypeComponent;
  let fixture: ComponentFixture<SubworktypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubworktypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubworktypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
