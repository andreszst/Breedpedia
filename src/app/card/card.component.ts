import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardData } from '../card-data';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dog-info',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="card mb-4 dog-info-card">
      <div class="ratio ratio-1x1 dog-info-ratio">
        <img
          class="card-img-top dog-info-img"
          [src]="cardData.photo"
          alt="dog photo"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title dog-info-title">{{ cardData.breed }}</h5>
        <a
          class="btn btn-info btn-sm dog-info-button"
          [routerLink]="['/details', cardData.breed_id]"
        >
          Ver detalhes
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.css'],
})
export class CardDataComponent {
  @Input() cardData!: CardData;
}
