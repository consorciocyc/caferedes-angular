import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportoymComponent } from './importoym.component';

describe('ImportoymComponent', () => {
  let component: ImportoymComponent;
  let fixture: ComponentFixture<ImportoymComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportoymComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportoymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
