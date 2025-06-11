import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products';
import { of } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { faker } from '@faker-js/faker';

describe('ProductsService (manual HttpClient mock)', () => {
  let service: ProductsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const generateMockProduct = (): Product => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    category: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    rating: {
      rate: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
      count: faker.number.int({ min: 1, max: 1000 }),
    },
  });

  const mockProducts: Product[] = [generateMockProduct(), generateMockProduct()];

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
    httpClientSpy.get.and.returnValue(of(mockProducts));

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
      expect(products.length).toBe(2);
    });

    expect(httpClientSpy.get).toHaveBeenCalledOnceWith('https://fakestoreapi.com/products');
  });
});
