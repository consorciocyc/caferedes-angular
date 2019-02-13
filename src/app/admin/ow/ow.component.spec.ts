import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwComponent } from './ow.component';

describe('OwComponent', () => {
  let component: OwComponent;
  let fixture: ComponentFixture<OwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
