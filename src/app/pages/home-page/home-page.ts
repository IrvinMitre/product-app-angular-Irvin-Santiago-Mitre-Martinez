import { Component } from '@angular/core';
import { Product } from '../../models/product.model';

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
  alertColor: 'success' | 'error' = 'error';
  productToEdit: Product | undefined;

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  toggleAlert(): void {
    this.showAlert = !this.showAlert;
  }

  toggleFormSucces(): void {
    this.showModal = false;
    this.alertTitle = this.productToEdit ? 'Product Updated' : 'Product Created';
    this.alertDescription = this.productToEdit
      ? 'The product was successfully updated.'
      : 'The product was successfully added.';
    this.alertColor = 'success';
    this.showAlert = true;
    this.productToEdit = undefined;
  }

  onEdit(product: Product): void {
    this.productToEdit = product;
    this.toggleModal();
  }
}
