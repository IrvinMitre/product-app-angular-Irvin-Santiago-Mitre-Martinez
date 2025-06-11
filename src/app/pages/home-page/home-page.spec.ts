import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home-page';
import { provideHttpClient } from '@angular/common/http';
import { ProductTableComponent } from '../../products/components/product-table/product-table';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage, ProductTableComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
