import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Exame } from '../types/exames.model';
import { PaginatedResponse } from '../../../shared/types/paginated-response.model';
import { QueryExamsDto } from '../types/query-exams.dto';

@Injectable({
  providedIn: 'root',
})
export class ExamesService {
  private readonly api = inject(ApiService);
  private readonly endpoint = 'exames';

  list(filters: QueryExamsDto = { page: 1, pageSize: 10 }) {
    return this.api.get<PaginatedResponse<Exame>>(this.endpoint, filters);
  }

  getById(id: string): Observable<Exame> {
    return this.api.get<Exame>(`${this.endpoint}/${id}`);
  }

  create(data: Exame): Observable<Exame> {
    return this.api.post<Exame>(this.endpoint, data, true);
  }

  update(id: string, data: Exame): Observable<Exame> {
    return this.api.put<Exame>(`${this.endpoint}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
