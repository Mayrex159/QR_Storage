import { TestBed } from '@angular/core/testing';

import { StorageActService } from './storage-act.service';

describe('StorageActService', () => {
  let service: StorageActService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageActService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
