import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTableComponent } from './product-table';
import { ProductsService } from '../../../services/products';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Product } from '../../../models/product.model';
import { faker } from '@faker-js/faker';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;
  let productsService: ProductsService;

  const generateMockProduct = (): Product => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    category: faker.helpers.arrayElement(['electronics', 'clothing', 'jewelery', 'books']),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    rating: {
      rate: parseFloat(faker.number.float({ min: 1, max: 5}).toFixed(1)),
      count: faker.number.int({ min: 1, max: 1000 }),
    },
  });

  const mockProducts: Product[] = [generateMockProduct(), generateMockProduct()];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTableComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    spyOn(productsService, 'getProducts').and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(component.loading).toBeFalse();
    expect(component.products.length).toBe(2);
    expect(component.error).toBeFalse();
  });

  it('should set error to true on API failure', () => {
    spyOn(productsService, 'getProducts').and.returnValue(throwError(() => new Error('API error')));

    component.ngOnInit();

    expect(component.loading).toBeFalse();
    expect(component.error).toBeTrue();
    expect(component.products.length).toBe(0);
  });
});
