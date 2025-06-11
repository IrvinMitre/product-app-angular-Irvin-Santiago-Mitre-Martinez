import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home-page/home-page';
import { ProductTableComponent } from './products/components/product-table/product-table';
import { provideHttpClient } from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';
import { ModalComponent } from './shared/modal-component/modal-component';
import { ProductFormComponent } from './products/components/product-form-component/product-form-component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    ProductTableComponent,
    ModalComponent,
    ProductFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
