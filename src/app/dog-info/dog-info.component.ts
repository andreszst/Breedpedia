import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogInfo } from '../doginfo';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dog-info',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="dogInfo.photo" alt="dog photo" />
      <h2 class="listing-heading">{{ dogInfo.breed }}</h2>
      <a [routerLink]="['/details', dogInfo.breed_id]">Ver detalhes</a>
    </section>
  `,
  styleUrls: ['./dog-info.component.css'],
})
export class DogInfoComponent {
  @Input() dogInfo!: DogInfo;
}
