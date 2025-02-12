import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDataComponent } from '../card/card.component';
import { CardData } from '../card-data';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardDataComponent],
  template: `
    <div class="mb-4">
      <div class="container text-center home-container">
        <form class="form-inline d-flex home-form" style="padding: 4px 0px;">
          <input
            class="form-control me-2 home-input"
            type="text"
            placeholder="Filtre por raça"
            #filter
          />
          <button
            class="btn btn-primary home-button"
            style="padding: 8px 12px;"
            type="button"
            (click)="filterResults(filter.value)"
          >
            Buscar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
              />
            </svg>
          </button>
        </form>
      </div>
      <div class="container-md text-left">
        <div
          class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
        >
          <app-dog-info
            *ngFor="let cardData of filterCardDataList"
            [cardData]="cardData"
          ></app-dog-info>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cardDataList: CardData[] = [];
  filterCardDataList: CardData[] = [];
  dogService: DogService = inject(DogService);

  constructor() {
    this.loadAllDogs();
  }

  async loadAllDogs() {
    this.cardDataList = await this.dogService.getCardData();
    this.filterCardDataList = this.cardDataList;
  }

  async filterResults(breed: string) {
    if (!breed) {
      this.filterCardDataList = this.cardDataList;
      return;
    }
    try {
      const filteredData = await this.dogService.getCardDataByBreed(breed);
      this.filterCardDataList = filteredData.length ? filteredData : [];
    } catch (error) {
      alert('Nada encontrado. Tente novamente ou use outro termo.');
    }
  }
}
