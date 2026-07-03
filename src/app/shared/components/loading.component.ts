import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="flex items-center justify-center py-12">
      <mat-spinner [diameter]="diameter"></mat-spinner>
    </div>
  `
})
export class LoadingComponent {
  @Input() diameter = 50;
}
