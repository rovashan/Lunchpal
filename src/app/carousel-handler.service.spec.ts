import { TestBed, inject } from '@angular/core/testing';

import { CarouselHandlerService } from './carousel-handler.service';

describe('CarouselHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarouselHandlerService]
    });
  });

  it('should be created', inject([CarouselHandlerService], (service: CarouselHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
