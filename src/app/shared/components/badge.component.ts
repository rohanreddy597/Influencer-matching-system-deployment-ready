import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [ngClass]="getBadgeClasses()"
      class="inline-block px-3 py-1 text-xs font-semibold rounded-full"
    >
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'success' | 'warning' | 'error' = 'primary';

  getBadgeClasses(): string {
    const variants = {
      primary: 'bg-indigo-100 text-indigo-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };

    return variants[this.variant];
  }
}
