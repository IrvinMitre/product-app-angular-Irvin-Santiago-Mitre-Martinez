import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.html',
  styleUrl: './product-table.css',
  standalone: false,
})
export class ProductTableComponent implements OnInit {
  private productsService = inject(ProductsService);
  products: Product[] = [];
  loading = true;
  error = false;

  round(value: number): number {
    return Math.round(value);
  }

  onEdit(product: Product): void {
    console.log('Editing product:', product);
  }

  onDelete(product: Product): void {
    console.log('Deleting product:', product);
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
