import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: false,
})
export class HomePage {
  showModal = false;
  showAlert = false;
  alertTitle = '';
  alertDescription = '';
  alertColor: 'success' | 'error' = 'success';

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  toggleAlert(): void {
    this.showAlert = !this.showAlert;
  }

  toggleFormSucces(): void {
    this.showModal = false;
    this.alertTitle = 'Product Created';
    this.alertDescription = 'The product was successfully added.';
    this.alertColor = 'success';
    this.showAlert = true;
  }
}
