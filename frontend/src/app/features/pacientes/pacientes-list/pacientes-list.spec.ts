import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacientesList } from './pacientes-list';
import { PacientesService } from '../services/pacientes.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { vi } from 'vitest';

describe('PacientesList', () => {
  let component: PacientesList;
  let fixture: ComponentFixture<PacientesList>;
  let service: PacientesService;

  const mockPatientsResponse = {
    data: [
      {
        id: "eae91af0-883e-4097-b64f-5a440586da43",
        name: "Paciente",
        document: "12345678901",
        email: "email@email.com",
        phone: "123123123",
        createdAt: "2025-11-29T18:33:02.589Z",
        updatedAt: "2025-11-29T18:33:02.589Z"
      },
      {
        id: "13052cfb-dc86-477e-a4f7-7eef01a6b9ce",
        name: "Paciente",
        document: "12345678907",
        email: "email@email.com",
        phone: "123123123",
        createdAt: "2025-11-29T18:33:55.368Z",
        updatedAt: "2025-11-29T18:33:55.368Z"
      }
    ],
    page: 1,
    pageSize: 10,
    totalPages: 1,
    total: 2
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PacientesList,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: PacientesService,
          useValue: {
            list: () => of(mockPatientsResponse)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PacientesList);
    component = fixture.componentInstance;
    service = TestBed.inject(PacientesService);
    fixture.detectChanges();
  });

  it('should create the component and load patients', () => {
    expect(component).toBeTruthy();
    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data[0].document).toBe('12345678901');
    expect(component.dataSource.data[1].document).toBe('12345678907');
  });

  it('should handle service error gracefully', () => {
    const serviceSpy = vi.spyOn(service, 'list').mockReturnValue(
      throwError(() => new Error('Backend error'))
    );
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.loadPatients();

    expect(serviceSpy).toHaveBeenCalled();

    const [msg, err] = consoleSpy.mock.calls[0];
    expect(msg).toBe('Erro carregando pacientes');
    expect(err).toBeInstanceOf(Error);

    expect(component.loading()).toBe(false);
  });
});
