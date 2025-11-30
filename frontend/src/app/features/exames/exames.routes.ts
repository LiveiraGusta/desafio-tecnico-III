import { Routes } from '@angular/router';
import { ExamesList } from './exames-list/exames-list';
import { ExamesForm } from './exames-form/exames-form';

export const EXAMES_ROUTES: Routes = [
  { path: '', component: ExamesList},
  { path: 'novo', component: ExamesForm},
  { path: ':id/editar', component: ExamesForm},
];
