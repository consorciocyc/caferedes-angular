import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportActaComponent } from './import-acta.component';

describe('ImportActaComponent', () => {
  let component: ImportActaComponent;
  let fixture: ComponentFixture<ImportActaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportActaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
