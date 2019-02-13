import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineriesComponent } from './wineries.component';

describe('WineriesComponent', () => {
  let component: WineriesComponent;
  let fixture: ComponentFixture<WineriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
