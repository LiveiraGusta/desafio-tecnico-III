import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseURL = environment.apiUrl || 'http://localhost:3000';

  //Idempotency
  private withIdempotency(headers?: HttpHeaders) {
    return (headers ?? new HttpHeaders()).set('idempotency-key', crypto.randomUUID());
  }

  get<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    return this.http
      .get<T>(`${this.baseURL}/${endpoint}`, {
        params: new HttpParams({ fromObject: params ?? {} }),
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  post<T>(endpoint: string, body: any, useIdempotency = true): Observable<T> {
    const headers = useIdempotency ? this.withIdempotency() : undefined;

    return this.http.post<T>(`${this.baseURL}/${endpoint}`, body, { headers })
        .pipe(retry(0),  catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseURL}/${endpoint}`, body)
        .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseURL}/${endpoint}`)
        .pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    console.error('%c[API ERROR]', 'color:red;font-weight:bold', err);
    const message = err?.error?.message ?? 'Unexpected API error';
    return throwError(() => new Error(message));
  }
}
