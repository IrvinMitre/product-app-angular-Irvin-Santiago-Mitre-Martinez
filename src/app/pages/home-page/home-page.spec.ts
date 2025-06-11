import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home-page';
import { provideHttpClient } from '@angular/common/http';
import { ProductTableComponent } from '../../products/components/product-table/product-table';
import { ModalComponent } from '../../shared/modal-component/modal-component';
import { ProductFormComponent } from '../../products/components/product-form-component/product-form-component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../../shared/alert-component/alert-component';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage, ProductTableComponent, ModalComponent, ProductFormComponent, AlertComponent],
      providers: [provideHttpClient()],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
