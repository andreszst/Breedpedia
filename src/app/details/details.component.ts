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
    <div
      style="margin-top: 40px"
    >
      <div>
        <div
          style="height: 50vh; max-width: 25vw; min-width: 50vh;overflow: hidden; margin: 0 auto; border-radius: 10px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2); padding: 0px;"
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
                  style="width: 100%; height: 100%; object-fit: cover;"
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
        <div style="justify-self:center; margin-top: 24px; display:block">
          <h2 style="font-size:3em; color:rgb(9, 115, 236)">
            {{ breedInfo?.name }}
          </h2>
          <section class="mb-4">
            <h2 style="color:rgb(242, 113, 8); font-size: 20px">
              Characteristics
            </h2>
            <ul class="list-unstyled">
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
