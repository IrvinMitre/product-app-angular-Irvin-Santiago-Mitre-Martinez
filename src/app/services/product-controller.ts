import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from './products';

@Injectable({ providedIn: 'root' })
export class ProductControllerService {
  private productsService = inject(ProductsService);

  createProduct(product: Product): Observable<Product> {
    return this.productsService.addProduct(product);
  }

  getAllProducts(): Observable<Product[]> {
    return this.productsService.getProducts();
  }

  deleteProduct(id: number): Observable<void> {
    return this.productsService.deleteProduct(id);
  }

  updateProduct(id: number, product: Product) {
    return this.productsService.updateProduct(id, product);
  }
}
