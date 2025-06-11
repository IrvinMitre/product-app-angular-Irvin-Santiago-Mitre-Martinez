import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  standalone: false,
})
export class HomePage {
  showModal = false;

  toggleModal(): void {
    this.showModal = !this.showModal;
  }
}
