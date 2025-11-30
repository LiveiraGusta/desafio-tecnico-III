import { TestBed } from '@angular/core/testing';
import { PacientesService } from './pacientes.service';
import { ApiService } from '../../../core/services/api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('PacientesService', () => {
  let service: PacientesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PacientesService, ApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(PacientesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve fazer GET de pacientes', () => {
    service.list().subscribe((res) => {
      expect(res.data).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/pacientes`);
    expect(req.request.method).toBe('GET');

    req.flush({ data: [{ id: '1', name: 'Fulano' }] });
  });
});
