import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { ExamesService } from './exames.service';
import { ApiService } from '../../../core/services/api.service';
import { QueryExamsDto } from '../types/query-exams.dto';
import { environment } from '../../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('ExamesService', () => {
  let service: ExamesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamesService, ApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ExamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('deve fazer GET de exames sem parâmetros', () => {
    service.list().subscribe((res) => {
      expect(res.data.length).toBe(1);
      expect(res.data[0].dicomModality).toBe('CT');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/exames`);
    expect(req.request.method).toBe('GET');

    req.flush({
      data: [{ id: '123', dicomModality: 'CT' }],
      page: 1,
      pageSize: 10,
      total: 1,
      totalPages: 1,
    });
  });

  it('deve enviar query params corretamente', () => {
    const query: QueryExamsDto = {
      page: 2,
      pageSize: 20,
      dicomModality: 'MR',
    };

    service.list(query).subscribe();

    const req = httpMock.expectOne(
      `${environment.apiUrl}/exames?page=2&pageSize=20&dicomModality=MR`
    );

    expect(req.request.method).toBe('GET');
    req.flush({ data: [], page: 2, pageSize: 20, total: 0, totalPages: 0 });
  });

  it('deve aceitar filtro por documento e examDate', () => {
    const query: QueryExamsDto = {
      patientDocument: '12345678900',
      examDate: '2025-11-10',
    };

    service.list(query).subscribe();

    const req = httpMock.expectOne(
      `${environment.apiUrl}/exames?patientDocument=12345678900&examDate=2025-11-10`
    );

    expect(req.request.method).toBe('GET');
    req.flush({ data: [] });
  });
});
