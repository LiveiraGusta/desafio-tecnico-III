import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { LayoutComponent } from './app/features/layout/layout';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    provideNativeDateAdapter(), 
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
}).catch(err => console.error(err));
