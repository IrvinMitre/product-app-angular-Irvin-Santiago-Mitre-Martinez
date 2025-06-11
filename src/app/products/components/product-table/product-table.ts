import { Component, inject, OnInit } from '@angular/core';
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
  itemsPerPage = 5;
  totalPages = 0;
  loading = true;
  error = false;

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

  onEdit(product: Product): void {
    console.log('Editing product:', product);
  }

  onDelete(product: Product): void {
    console.log('Deleting product:', product);
  }
}
