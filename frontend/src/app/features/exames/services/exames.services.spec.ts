import { TestBed } from '@angular/core/testing';
import { ExamesService } from './exames.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ExamesService', () => {
  let service: ExamesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExamesService],
    });

    service = TestBed.inject(ExamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch exams', () => {
    const mockResponse = {
      data: [],
      total: 0,
      page: 1,
      pageSize: 10,
      totalPages: 1
    };

    service.list({ page: 1, pageSize: 10 }).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req =>
      req.url.endsWith('/api/exames') &&
      req.params.get('page') === '1' &&
      req.params.get('pageSize') === '10'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
