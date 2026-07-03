import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <button
      [ngClass]="getButtonClasses()"
      [disabled]="disabled"
      (click)="onClick()"
      class="transition-all duration-300 font-semibold rounded-lg"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'accent' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;

  onClick() {
    // Button click handler
  }

  getButtonClasses(): string {
    const baseClasses = 'px-4 py-2 font-semibold rounded-lg transition-all hover:shadow-lg';
    
    const variantClasses = {
      primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/50',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      accent: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-pink-500/50'
    };

    const sizeClasses = {
      sm: 'text-sm px-3 py-1',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3'
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]}`;
  }
}
