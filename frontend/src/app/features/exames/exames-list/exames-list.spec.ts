import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamesList } from './exames-list';
import { ExamesService } from '../services/exames.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

describe('ExamesList', () => {
  let component: ExamesList;
  let fixture: ComponentFixture<ExamesList>;
  let service: ExamesService;

  const mockExamsResponse = {
    data: [
      {
        id: "f48728cc-2aee-4eca-a277-1e6c0449ab59",
        patientId: "eae91af0-883e-4097-b64f-5a440586da43",
        dicomModality: "CR",
        examDate: "2024-10-10T00:00:00.000Z",
        idempotencyKey: "wqwe",
        createdAt: "2025-11-29T22:30:05.286Z",
        patient: {
          id: "eae91af0-883e-4097-b64f-5a440586da43",
          name: "Paciente",
          document: "12345678901",
          email: "email@email.com",
          phone: "123123123",
          createdAt: "2025-11-29T18:33:02.589Z",
          updatedAt: "2025-11-29T18:33:02.589Z"
        }
      }
    ],
    total: 1,
    page: 1,
    pageSize: 10,
    totalPages: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExamesList,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule
      ],
      providers: [
        {
          provide: ExamesService,
          useValue: {
            list: () => of(mockExamsResponse) 
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExamesList);
    component = fixture.componentInstance;
    service = TestBed.inject(ExamesService);
    fixture.detectChanges();
  });

  it('should create the component and load exams', () => {
    expect(component).toBeTruthy();
    expect(component.dataSource.data[0].patientDocument).toBe('12345678901');
    expect(component.dataSource.data[0].dicomModality).toBe('CR');
    expect(component.dataSource.data[0].examDate).toBe('2024-10-10T00:00:00.000Z');
  });

  
  it('should handle service error gracefully', () => {
    const serviceSpy = vi.spyOn(service, 'list').mockReturnValue(
      throwError(() => new Error('Backend error'))
    );

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.loadExams();

    expect(serviceSpy).toHaveBeenCalled();

    const [msg, err] = consoleSpy.mock.calls[0];
    expect(msg).toBe('Erro carregando exames');
    expect(err).toBeInstanceOf(Error);

    expect(component.loading()).toBe(false);
  });



});
