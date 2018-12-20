import { TestBed, inject } from '@angular/core/testing';

import { AfirestoreService } from './afirestore.service';

describe('AfirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfirestoreService]
    });
  });

  it('should be created', inject([AfirestoreService], (service: AfirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
