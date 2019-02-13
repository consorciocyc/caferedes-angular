import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporthtmlComponent } from './importhtml.component';

describe('ImporthtmlComponent', () => {
  let component: ImporthtmlComponent;
  let fixture: ComponentFixture<ImporthtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImporthtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImporthtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
