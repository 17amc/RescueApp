import { TestBed } from '@angular/core/testing';

import { CloseModalesService } from './close-modales.service';

describe('CloseModalesService', () => {
  let service: CloseModalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseModalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
