import { TestBed } from '@angular/core/testing';
import { PacientesService } from './pacientes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

describe('PacientesService', () => {
  let service: PacientesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PacientesService],
    });

    service = TestBed.inject(PacientesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch patients', () => {
    const mockResponse = {
      data: [
        { id: '1', name: 'Fulano', document: '123456', email: 'fulano@email.com', phone: '123123123' },
        { id: '2', name: 'Ciclano', document: '654321', email: 'ciclano@email.com', phone: '321321321' }
      ],
      page: 1,
      pageSize: 10,
      totalPages: 1,
      total: 2
    };

    service.list().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req =>
      req.url.endsWith('/api/pacientes') &&
      req.params.get('page') === '1' &&
      req.params.get('pageSize') === '10'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
