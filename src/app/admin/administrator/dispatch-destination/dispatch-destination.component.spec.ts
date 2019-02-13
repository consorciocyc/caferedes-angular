import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchDestinationComponent } from './dispatch-destination.component';

describe('DispatchDestinationComponent', () => {
  let component: DispatchDestinationComponent;
  let fixture: ComponentFixture<DispatchDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
