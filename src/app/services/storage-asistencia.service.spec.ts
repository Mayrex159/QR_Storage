import { TestBed } from '@angular/core/testing';

import { StorageAsistenciaService } from './storage-asistencia.service';

describe('StorageAsistenciaService', () => {
  let service: StorageAsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageAsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
