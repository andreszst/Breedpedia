import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogInfo } from '../doginfo';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dog-info',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div
      class="card mb-4"
      style="background-color: #f8f9fa; border: none; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
    >
      <div class="ratio ratio-1x1" style="overflow: hidden;">
        <img class="card-img-top"
          [src]="dogInfo.photo"
          alt="dog photo"
          style="object-fit: cover;"
        />
      </div>
      <div class="card-body">
        <h2 style="font-size: 15px; font-weight: semi-bold; color: rgb(5, 50, 75)">{{ dogInfo.breed }}</h2>
        <a style="text-decoration: none; color:rgb(11, 108, 164);" [routerLink]="['/details', dogInfo.breed_id]">Ver detalhes</a>
      </div>
    </div>
  `,
  styleUrls: ['./dog-info.component.css'],
})
export class DogInfoComponent {
  @Input() dogInfo!: DogInfo;
}
