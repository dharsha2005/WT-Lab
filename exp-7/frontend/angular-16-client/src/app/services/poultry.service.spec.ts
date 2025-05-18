import { TestBed } from '@angular/core/testing';

import { PoultryService } from './poultry.service';

describe('PoultryService', () => {
  let service: PoultryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoultryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
