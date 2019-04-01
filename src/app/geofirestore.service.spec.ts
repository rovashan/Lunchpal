import { TestBed, inject } from '@angular/core/testing';

import { GeofirestoreService } from './geofirestore.service';

describe('GeofirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeofirestoreService]
    });
  });

  it('should be created', inject([GeofirestoreService], (service: GeofirestoreService) => {
    expect(service).toBeTruthy();
  }));
});
