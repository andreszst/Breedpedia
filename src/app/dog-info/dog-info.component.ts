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
        <h5 class="card-title" style="font-size:1em">{{ dogInfo.breed }}</h5>
        <a class="btn btn-info btn-sm" style="color:rgb(255, 255, 255); background-color:rgb(242, 113, 8); border: none;" [routerLink]="['/details', dogInfo.breed_id]">Ver detalhes</a>
      </div>
    </div>
  `,
  styleUrls: ['./dog-info.component.css'],
})
export class DogInfoComponent {
  @Input() dogInfo!: DogInfo;
}
