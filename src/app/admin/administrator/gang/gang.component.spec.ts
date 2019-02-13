import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GangComponent } from './gang.component';

describe('GangComponent', () => {
  let component: GangComponent;
  let fixture: ComponentFixture<GangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
