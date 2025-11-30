import { Routes } from '@angular/router';
import { PacientesList } from './pacientes-list/pacientes-list';
import { PacientesForm } from './pacientes-form/pacientes-form';

export const PACIENTES_ROUTES: Routes = [
  { path: '', component: PacientesList },
  { path: 'novo', component: PacientesForm },
  { path: ':id/editar', component: PacientesForm },
];
