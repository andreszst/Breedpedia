// home.component.ts
import {
  Component,
  inject,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDataComponent } from '../card/card.component';
import { CardData } from '../card-data';
import { DogService } from '../dog.service';
import { HomeNavigationService } from '../home-navigation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardDataComponent],
  template: `
    <div class="mb-4">
      <div class="container text-center home-container">
        <form
          #formRef
          class="form-inline d-flex home-form"
          style="padding: 4px 0px;"
        >
          <input
            class="form-control me-2 home-input"
            type="text"
            placeholder="Search by breed"
            #filter
          />
          <button
            class="btn btn-primary home-button"
            style="padding: 8px 12px;"
            type="button"
            (click)="filterResults(filter.value)"
          >
            Search
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
          <card-component
            *ngFor="let cardData of filterCardDataList"
            [cardData]="cardData"
          ></card-component>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public cardDataList: CardData[] = [];
  public filterCardDataList: CardData[] = [];
  dogService: DogService = inject(DogService);
  homeNavigationService: HomeNavigationService = inject(HomeNavigationService);
  @ViewChild('formRef') form!: ElementRef<HTMLFormElement>;

  constructor() {
    this.loadAllDogs();
  }

  ngOnInit(): void {
    this.homeNavigationService.homeClick$.subscribe((isHomeClicked) => {
      this.onHomeClick(isHomeClicked);
    });
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
      alert('A busca não funcionou. Tente novamente ou use outro termo.');
    }
  }
  onHomeClick(isHomeClicked: boolean): void {
    this.loadAllDogs();
    if (this.form) {
      this.form.nativeElement.reset();
    }
  }
}
