import { TestBed, inject } from '@angular/core/testing';

import { TrasnferService } from './trasnfer.service';

describe('TrasnferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrasnferService]
    });
  });

  it('should be created', inject([TrasnferService], (service: TrasnferService) => {
    expect(service).toBeTruthy();
  }));
});
