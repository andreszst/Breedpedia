import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogInfo } from '../doginfo';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dog-info',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="card mb-4 dog-info-card">
      <div class="ratio ratio-1x1 dog-info-ratio">
        <img class="card-img-top dog-info-img"
          [src]="dogInfo.photo"
          alt="dog photo"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title dog-info-title">{{ dogInfo.breed }}</h5>
        <a class="btn btn-info btn-sm dog-info-button" [routerLink]="['/details', dogInfo.breed_id]">
          Ver detalhes
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./dog-info.component.css'],
})
export class DogInfoComponent {
  @Input() dogInfo!: DogInfo;
}
