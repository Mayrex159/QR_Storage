import { TestBed } from '@angular/core/testing';

import { StorageClaseService } from './storage-clase.service';

describe('StorageClaseService', () => {
  let service: StorageClaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageClaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
