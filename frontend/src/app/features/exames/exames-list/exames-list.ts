import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ExamesService } from '../services/exames.service';
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
import { Exame } from '../types/exames.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { QueryExamsDto } from '../types/query-exams.dto';
import { CleanObject } from '../../../shared/utils/cleanObject.util';
import { DicomModality } from '../types/dicom-modality';

@Component({
  selector: 'app-exames-list',
  standalone: true,
  templateUrl: './exames-list.html',
  styleUrl: './exames-list.css',  
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
  ]
})

export class ExamesList implements OnInit, OnDestroy {
  private service = inject(ExamesService);
  private cleanObject = CleanObject;

  displayedColumns = ['patientName', 'patientDocument', 'dicomModality', 'examDate', 'actions'];
  dataSource = new MatTableDataSource<Exame>([]);
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  modalities = Object.values(DicomModality);
  selectedModality?: DicomModality;

  loading = signal(false);
  showFilters = false;

  ngOnInit(): void {
    this.loadExams();
  }

  ngOnDestroy(): void {
    this.dataSource.data = []
  }

  formFilters = new FormGroup({
    patientDocument: new FormControl(''),
    dicomModality: new FormControl<DicomModality | null>(null),
  });

  get patientDocumentControl() {
    return this.formFilters.get('patientDocument') as FormControl;
  }

  get dicomModalityControl() {
    return this.formFilters.get('dicomModality') as FormControl;
  }

  loadExams() {
    const filters: QueryExamsDto = {
      page: this.pageIndex + 1,
      pageSize: this.pageSize,
      patientDocument: this.patientDocumentControl.value || null,
      dicomModality: this.dicomModalityControl.value || null,
    };

    const query = this.cleanObject(filters);

    this.loading.set(true);
    this.service.list(query).subscribe({
      next: (res) => {
        this.dataSource.data = res.data.map(exame => ({
          id: exame.id,
          patientName: exame.patient?.name ?? '',
          patientDocument: exame.patient?.document ?? '',
          dicomModality: exame.dicomModality ?? '',
          examDate: exame.examDate,
        }));
        this.totalItems = res.total;
        this.loading.set(false);
      },
      error: (e) => {
        console.error('Erro carregando exames', e);
        this.loading.set(false);
      },
    });
  }

  applyFilters() {
    this.pageIndex = 0;
    this.loadExams();
  }

  clearFilters() {
    this.formFilters.reset();
    this.pageIndex = 0;
    this.loadExams();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadExams();
  }
}
