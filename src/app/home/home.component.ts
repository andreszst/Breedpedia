import {
  Component,
  inject,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDataComponent } from '../card/card.component';
import { CardData } from '../interfaces/card.interface';
import { DogService } from '../services/dog.service';
import { HomeNavigationService } from '../services/home-navigation.service';

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
            (click)="searchResults(filter.value)"
          >
            Search
            <span class="icon-search"></span>
          </button>
        </form>
      </div>
      <div class="container-md text-left">
        <div
          class="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"
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
    this.loadCards();
  }

  ngOnInit(): void {
    this.homeNavigationService.homeClick$.subscribe((isHomeClicked) => {
      this.onHomeClick();
    });
  }

  async loadCards() {
    this.cardDataList = await this.dogService.getCardData();
    this.filterCardDataList = this.cardDataList;
  }

  async searchResults(breed: string) {
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

  onHomeClick(): void {
    this.loadCards();
    if (this.form) {
      this.form.nativeElement.reset();
    }
  }
}
