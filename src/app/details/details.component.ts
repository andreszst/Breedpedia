import { Component, inject, OnInit } from '@angular/core';
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
    <div class="details-container">
      <div>
        <div class="carousel-wrapper">
          <div id="carouselExampleIndicators" class="carousel slide">
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
            <div class="carousel-inner carousel-inner-custom">
              <div
                *ngFor="let photo of breedPhotos; let i = index"
                class="carousel-item carousel-item-custom"
                [ngClass]="{ active: i === 0 }"
              >
                <img
                  class="d-block w-100 carousel-img"
                  [src]="photo.photo"
                  alt="Dog photo"
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
        <div class="details-text-wrapper" style="margin-bottom: 24px;">
          <h2 class="breed-name">
            {{ breedInfo?.name }}
          </h2>
          <section class="mb-3" style="padding-bottom: 10px;">
            <h2 class="characteristics-title">Characteristics</h2>
            <ul class="list-unstyled pb-0">
              <li><strong>Weight:</strong> {{ breedInfo?.weight }} kg</li>
              <li><strong>Height:</strong> {{ breedInfo?.height }} cm</li>
              <li><strong>Lifespan:</strong> {{ breedInfo?.life_span }}</li>
              <li><strong>Bred for:</strong> {{ breedInfo?.bred_for }}</li>
              <li>
                <strong>Temperament:</strong> {{ breedInfo?.temperament }}
              </li>
            </ul>
          </section>
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

  ngOnInit() {
    window.scrollTo(0, 0);
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
