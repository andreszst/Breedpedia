import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DogService } from '../dog.service';
import { BreedInfo } from '../breedinfo';
import { DogInfo } from '../doginfo';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container" style="margin-top: 80px;">
      <div class="row row-cols-1  row-cols-md-2">
        <div style="margin: 0 auto;">
          <h2 style="font-size:50px">{{ breedInfo?.name }}</h2>
          <section>
            <h2 style="color:rgb(12, 116, 176)">Informações</h2>
            <ul class="list-unstyled">
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
          style="max-width: 350px; height: 350px; overflow: hidden; margin: 0 auto;"
        >
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            style="height: 100%;"
          >
            <div class="carousel-indicators">
              <button
                *ngFor="let photo of breedPhotos; let i = index"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                [attr.data-bs-slide-to]="i"
                [ngClass]="{ active: i === 0 }"
                [attr.aria-current]="i === 0 ? 'true' : null"
                [attr.aria-label]="'Slide ' + (i + 1)"
              ></button>
            </div>
            <div class="carousel-inner" style="height: 100%;">
              <div
                *ngFor="let photo of breedPhotos; let i = index"
                class="carousel-item"
                [ngClass]="{ active: i === 0 }"
                style="height: 100%;"
              >
                <img
                  class="d-block w-100"
                  [src]="photo.photo"
                  alt="Dog photo"
                  style="width: 100%; height: 350px; object-fit: cover;"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  dogService = inject(DogService);
  breedInfo: BreedInfo | undefined;
  dogInfoId: string;
  breedPhotos: DogInfo[] | undefined;
  constructor() {
    this.dogInfoId = this.route.snapshot.params['id'];
    this.loadBreedInfo();
    this.loadBreedPhotos();
  }

  async loadBreedInfo() {
    this.breedInfo = await this.dogService.getBreedInfo(this.dogInfoId);
  }
  async loadBreedPhotos() {
    this.breedPhotos = await this.dogService.getDogInfoByBreedId(
      this.dogInfoId
    );
  }
}
