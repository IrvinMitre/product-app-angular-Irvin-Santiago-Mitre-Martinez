import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-component',
  standalone: false,
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.css',
})
export class AlertComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() type: 'success' | 'error' = 'error';
  @Input() show = false;

  @Output() closeAlert = new EventEmitter<void>();

  get textColor(): string {
    return this.type === 'success' ? 'text-green-600' : 'text-red-600';
  }

  get icon(): string {
    return this.type === 'success' ? '✔️' : '❌';
  }

  handleClose() {
    this.closeAlert.emit();
  }
}
