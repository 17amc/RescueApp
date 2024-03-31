import { TestBed } from '@angular/core/testing';

import { DatosUsersService } from './datos-users.service';

describe('DatosUsersService', () => {
  let service: DatosUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
