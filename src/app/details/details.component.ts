import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DogService } from '../dog.service';
import { BreedInfo } from '../breedinfo';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],

  template: `
    <article style="display: flex; flex-direction: row; align-items: flex-start; margin-top: 100px" class="container text-right">
      <div style="margin-left: 20px;">
        <h2 style="font-size:80px">{{ breedInfo?.name }}</h2>
        <section>
          <h2 style="color:rgb(13, 125, 223)" >Informações</h2>
          <ul>
            <li><strong>Peso:</strong> {{ breedInfo?.weight }} kg</li>
            <li><strong>Altura:</strong> {{ breedInfo?.height }} cm</li>
            <li>
              <strong>Expectativa de vida:</strong> {{ breedInfo?.life_span }}
            </li>
            <li><strong>Ótimo para:</strong> {{ breedInfo?.bred_for }}</li>
            <li>
              <strong>Comportamento:</strong> {{ breedInfo?.temperament }}
            </li>
          </ul>
        </section>
      </div>
      <div
        class="ratio ratio-1x1"
        style="max-height: 400px; max-width:400px; overflow: hidden; margin-left: auto;"
      >
        <img
          style="max-height: 100%; max-width:100%; object-fit: cover;"
          class="card"
          [src]="
            'https://cdn2.thedogapi.com/images/' +
            breedInfo?.reference_image_id +
            '.jpg'
          "
          alt="dog photo"
        />
      </div>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  dogService = inject(DogService);
  breedInfo: BreedInfo | undefined;
  dogInfoId: string;
  constructor() {
    this.dogInfoId = this.route.snapshot.params['id'];
    this.loadBreedInfo();
  }

  async loadBreedInfo() {
    this.breedInfo = await this.dogService.getBreedInfo(this.dogInfoId);
  }
}
