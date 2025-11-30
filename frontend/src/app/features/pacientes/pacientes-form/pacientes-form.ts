import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PacientesService } from '../services/pacientes.service';
import { Paciente } from '../types/paciente.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pacientes-form',
  standalone: true,
  templateUrl: './pacientes-form.html',
  styleUrl: './pacientes-form.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
})

export class PacientesForm implements OnDestroy {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    document: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
  });

  constructor(
    private dialogRef: MatDialogRef<PacientesForm>,
    private service: PacientesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.form.reset();
  }

  submit() {
    if (this.form.valid) {
      const payload: Paciente = {
        name: this.form.value.name!,
        document: this.form.value.document!,
        email: this.form.value.email!,
        phone: this.form.value.phone || ''
      };

      this.service.create(payload).subscribe({
        next: () => {
          this.snackBar.open('Paciente criado com sucesso', 'Fechar', { duration: 3000 });
          this.cancel();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Erro ao criar paciente', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }


}
