import { Component, signal } from '@angular/core';
import { LayoutComponent } from "./features/layout/layout";

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
