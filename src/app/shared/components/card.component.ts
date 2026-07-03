import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
      [ngClass]="{'cursor-pointer': clickable}"
    >
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() clickable = false;
}
