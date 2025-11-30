import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { Paciente } from '../types/paciente.model';
import { PaginatedResponse } from '../../../shared/types/paginated-response.model';
import { QueryPatientsDto } from '../types/query-patients.dto';

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  private readonly api = inject(ApiService);
  private readonly endpoint = 'pacientes';

  list(filters: QueryPatientsDto = { page: 1, pageSize: 10 }) {
    return this.api.get<PaginatedResponse<Paciente>>(this.endpoint, filters);
  }

  getById(id: string): Observable<Paciente> {
    return this.api.get<Paciente>(`${this.endpoint}/${id}`);
  }

  create(data: Paciente): Observable<Paciente> {
    return this.api.post<Paciente>(this.endpoint, data);
  }

  update(id: string, data: Paciente): Observable<Paciente> {
    return this.api.put<Paciente>(`${this.endpoint}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
