import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ExamesService } from '../services/exames.service';
import { Exame } from '../types/exames.model';
import { DicomModality } from '../types/dicom-modality';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-exames-form',
  standalone: true,
  templateUrl: './exames-form.html',
  styleUrl: './exames-form.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
  ],
})

export class ExamesForm implements OnDestroy {
 form = new FormGroup({
    patientDocument: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    responsibleDoctor: new FormControl('', Validators.required),
    dicomModality: new FormControl<DicomModality | null>(null, Validators.required),
    examDate: new FormControl('', Validators.required),
  });

  constructor(
    private dialogRef: MatDialogRef<ExamesForm>,
    private service: ExamesService,
    private snackBar: MatSnackBar
  ) {}

  modalities = Object.values(DicomModality);
  selectedModality?: DicomModality;
  
  ngOnDestroy(): void {
    this.form.reset();
  }

  submit() {
    if (this.form.valid) {
      const payload: Exame = this.form.value as Exame;

      this.service.create(payload).subscribe({
        next: () => {
          this.snackBar.open('Exame criado com sucesso', 'Fechar', { duration: 3000 });
          this.cancel();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Erro ao criar exame', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}

