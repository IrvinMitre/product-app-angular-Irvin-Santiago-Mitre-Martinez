import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { ProductControllerService } from '../../../services/product-controller';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form-component.html',
  styleUrl: './product-form-component.css',
  standalone: false,
})
export class ProductFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private productController = inject(ProductControllerService);

  @Output() formCompleted = new EventEmitter<void>();
  @Input() productToEdit?: Product;

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  categories: string[] = ['electronics', "men's clothing", "women's clothing", 'jewelery'];

  productForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0.01)]],
    description: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
  });

  imagePreview: string | null = null;
  isSubmitting = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productToEdit'] && this.productToEdit) {
      this.productForm.patchValue(this.productToEdit);
      this.imagePreview = this.productToEdit.image;
    }
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.imagePreview = result;
        this.productForm.patchValue({ image: result });
      };
      reader.readAsDataURL(file);
    }
  }

  triggerImageInput(event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();
    this.fileInputRef.nativeElement.click();
  }

  removeImage(): void {
    this.imagePreview = null;
    this.productForm.patchValue({ image: '' });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isSubmitting = true;
      this.productForm.disable();
      const product = this.productForm.value as Product;

      const finalize = () => {
        this.isSubmitting = false;
        this.productForm.enable();
        this.imagePreview = null;
        this.productForm.reset();
        this.formCompleted.emit();
      };

      if (this.productToEdit) {
        this.productController.updateProduct(this.productToEdit.id as number, product).subscribe({
          next: finalize,
          error: finalize,
        });
      } else {
        this.productController.createProduct(product).subscribe({
          next: finalize,
          error: finalize,
        });
      }
    }
  }
}
