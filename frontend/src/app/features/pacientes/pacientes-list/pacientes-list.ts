import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CleanObject } from '../../../shared/utils/cleanObject.util';
import { PacientesService } from '../services/pacientes.service';
import { Paciente } from '../types/paciente.model';
import { QueryPatientsDto } from '../types/query-patients.dto';

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  templateUrl: './pacientes-list.html',
  styleUrl: './pacientes-list.css',
   imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatSelectModule,
    DatePipe,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatExpansionModule,
   ],
})
export class PacientesList {
  private service = inject(PacientesService);
  private cleanObject = CleanObject;

  displayedColumns = ['name', 'document', 'email', 'phone','createdAt', 'actions'];
  dataSource = new MatTableDataSource<Paciente>([]);

  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  loading = signal(false);
  showFilters = false;
    
  ngOnInit(): void {
    this.loadPatients();
  }

  ngOnDestroy(): void {
    this.dataSource.data = []
  }

  formFilters = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    document: new FormControl(''),
  });

  get nameControl() {
    return this.formFilters.get('name') as FormControl;
  }

  get emailControl() {
    return this.formFilters.get('email') as FormControl;
  }

  get phoneControl() {
    return this.formFilters.get('phone') as FormControl;
  }
  get documentControl() {
    return this.formFilters.get('document') as FormControl;
  }

  loadPatients() {
    const filters: QueryPatientsDto = {
      page: this.pageIndex + 1,
      pageSize: this.pageSize,
      name: this.nameControl.value || null,
      document: this.documentControl.value || null,
      email: this.emailControl.value || null,
      phone: this.phoneControl.value || null,
    };

    const query = this.cleanObject(filters);

    this.loading.set(true);
    this.service.list(query).subscribe({
      next: (res) => {
        this.dataSource.data = res.data.map(paciente => ({
          id: paciente.id,
          name: paciente.name ?? '',
          email: paciente.email ?? '',
          document: paciente.document ?? '',
          phone: paciente.phone ?? '',
          createdAt: paciente.createdAt,
        }));
        this.totalItems = res.total;
        this.loading.set(false);
      },
      error: (e) => {
        console.error('Erro carregando pacientes', e);
        this.loading.set(false);
      },
    });
  }

  applyFilters() {
    this.pageIndex = 0;
    this.loadPatients();
  }

  clearFilters() {
    this.formFilters.reset();
    this.pageIndex = 0;
    this.loadPatients();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPatients();
  }
}

