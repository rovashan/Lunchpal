import { TestBed, inject } from '@angular/core/testing';

import { OnesignalService } from './onesignal.service';

describe('OnesignalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnesignalService]
    });
  });

  it('should be created', inject([OnesignalService], (service: OnesignalService) => {
    expect(service).toBeTruthy();
  }));
});
