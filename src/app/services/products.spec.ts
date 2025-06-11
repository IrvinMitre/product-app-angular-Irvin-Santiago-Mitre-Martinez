import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products';
import { of } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

describe('ProductsService (manual HttpClient mock)', () => {
  let service: ProductsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [ProductsService, { provide: HttpClient, useValue: httpClientSpy }],
    });

    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from API', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        price: 10,
        category: 'cat',
        description: '',
        image: '',
        rating: { rate: 4, count: 100 },
      },
      {
        id: 2,
        title: 'Product 2',
        price: 20,
        category: 'cat',
        description: '',
        image: '',
        rating: { rate: 3, count: 50 },
      },
    ];

    httpClientSpy.get.and.returnValue(of(mockProducts));

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
      expect(products.length).toBe(2);
    });

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith('https://fakestoreapi.com/products');
  });
});
