import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  standalone: false,
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.css',
})
export class ModalComponent {
  @Input() show = false;
  @Input() title = '';
  @Output() modalClose = new EventEmitter<void>();

  onClose(): void {
    this.modalClose.emit();
  }
}
