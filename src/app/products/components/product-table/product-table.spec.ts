import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductTableComponent } from './product-table';
import { of, throwError } from 'rxjs';
import { Product } from '../../../models/product.model';
import { faker } from '@faker-js/faker';
import { ProductControllerService } from '../../../services/product-controller';
import { AlertComponent } from '../../../shared/alert-component/alert-component';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;
  let productController: ProductControllerService;

  const generateMockProduct = (): Product => ({
    id: faker.number.int({ min: 1, max: 1000 }),
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    category: faker.helpers.arrayElement(['electronics', 'clothing', 'jewelery', 'books']),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    rating: {
      rate: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
      count: faker.number.int({ min: 1, max: 1000 }),
    },
  });

  const mockProducts: Product[] = [generateMockProduct(), generateMockProduct()];

  class MockProductControllerService {
    getAllProducts = jasmine.createSpy().and.returnValue(of(mockProducts));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTableComponent, AlertComponent],
      providers: [{ provide: ProductControllerService, useClass: MockProductControllerService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    productController = TestBed.inject(ProductControllerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    component.ngOnInit();

    expect(productController.getAllProducts).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
    expect(component.products.length).toBe(2);
    expect(component.error).toBeFalse();
  });

  it('should set error to true on API failure', () => {
    (productController.getAllProducts as jasmine.Spy).and.returnValue(
      throwError(() => new Error('API error')),
    );

    component.ngOnInit();

    expect(component.loading).toBeFalse();
    expect(component.error).toBeTrue();
    expect(component.products.length).toBe(0);
  });
});
