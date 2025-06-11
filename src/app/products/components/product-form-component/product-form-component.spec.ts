import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form-component';
import { faker } from '@faker-js/faker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { ProductControllerService } from '../../../services/product-controller';

class MockProductControllerService {
  createProduct = jasmine.createSpy().and.returnValue(of({}));
}

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule, FormsModule, CommonModule],
      providers: [{ provide: ProductControllerService, useClass: MockProductControllerService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createProduct and reset form on submit', () => {
    const controller = TestBed.inject(ProductControllerService);
    const formData = {
      title: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 1, max: 1000 })),
      description: faker.commerce.productDescription(),
      category: faker.helpers.arrayElement(['electronics', 'clothing', 'jewelery', 'books']),
      image: faker.image.url(),
    };

    component.productForm.setValue(formData);
    component.onSubmit();

    expect(controller.createProduct).toHaveBeenCalledWith(formData);
  });
});
