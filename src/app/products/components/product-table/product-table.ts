import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductControllerService } from '../../../services/product-controller';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
  standalone: false,
})
export class ProductTableComponent implements OnInit {
  private productController = inject(ProductControllerService);
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 0;
  loading = true;
  error = false;

  showAlert = false;
  alertTitle = '';
  alertDescription = '';
  alertColor: 'success' | 'error' = 'error';

  showDeleteConfirm = false;
  selectedProductToDelete?: Product;

  @Output() edit = new EventEmitter<Product>();

  ngOnInit(): void {
    this.productController.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
        this.setPaginatedProducts();
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  setPaginatedProducts(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.setPaginatedProducts();
  }

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  confirmDelete(product: Product): void {
    this.selectedProductToDelete = product;
    this.showDeleteConfirm = true;
  }

  deleteConfirmed(): void {
    if (!this.selectedProductToDelete) return;

    this.productController.deleteProduct(this.selectedProductToDelete.id as number).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== this.selectedProductToDelete!.id);
        this.totalPages = Math.max(1, Math.ceil(this.products.length / this.itemsPerPage));
        if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
        this.setPaginatedProducts();

        this.alertTitle = 'Deleted Product';
        this.alertDescription = 'The product was deleted successfully.';
        this.alertColor = 'success';
        this.showAlert = true;
        this.closeDeleteModal();
      },
      error: () => {
        this.alertTitle = 'Error Deleting';
        this.alertDescription = 'Something occurred while deleting the product.';
        this.alertColor = 'error';
        this.showAlert = true;
        this.closeDeleteModal();
      },
    });
  }

  closeDeleteModal(): void {
    this.showDeleteConfirm = false;
    this.selectedProductToDelete = undefined;
  }

  toggleModal(): void {
    this.showAlert = !this.showAlert;
  }
}
