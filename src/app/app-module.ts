import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { HomePage } from './pages/home-page/home-page';
import { ProductTableComponent } from './products/components/product-table/product-table';
import { provideHttpClient } from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';

@NgModule({
  declarations: [AppComponent, HomePage, ProductTableComponent],
  imports: [BrowserModule, AppRoutingModule],
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
