import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTableComponent } from './product-table';
import { ProductsService } from '../../../services/products';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Product } from '../../../models/product.model';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;
  let productsService: ProductsService;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 99.99,
      category: 'electronics',
      description: 'test description',
      image: 'https://example.com/img1.jpg',
      rating: { rate: 4.5, count: 100 },
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 49.99,
      category: 'clothing',
      description: 'test description 2',
      image: 'https://example.com/img2.jpg',
      rating: { rate: 3.8, count: 50 },
    },
  ];

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
