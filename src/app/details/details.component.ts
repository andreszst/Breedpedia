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
    <article>
      <img class ="listing-photo" [src]="'https://cdn2.thedogapi.com/images/' + breedInfo?.reference_image_id + '.jpg'" alt="dog photo" />
      <h2 class="listing-heading" >{{ breedInfo?.name }}</h2>
      <section class="listing-features">
        <h2 class="section-heading">Informações</h2>
        <ul>
          <li><strong>Peso:</strong> {{ breedInfo?.weight }} kg</li>
          <li><strong>Altura:</strong> {{ breedInfo?.height }} cm</li>
          <li><strong>Expectativa de vida:</strong> {{ breedInfo?.life_span }}</li>
          <li><strong>Ótimo para:</strong> {{ breedInfo?.bred_for }}</li>
          <li><strong>Comportamento:</strong> {{ breedInfo?.temperament }}</li>
        </ul>
      </section>
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