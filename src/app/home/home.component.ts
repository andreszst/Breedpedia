import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogInfoComponent } from '../dog-info/dog-info.component';
import { DogInfo } from '../doginfo';
import { DogService } from '../dog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DogInfoComponent],
  template: `
    <div
      class="container text-center"
      style="margin-top: 0px; margin-bottom: 0px;"
    >
      <form
        class="form-inline d-flex"
        style="margin-top: 20px; margin-bottom: 20px;"
      >
        <input
          style="max-width:300px; border: none; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);"
          class="form-control me-2"
          type="text"
          placeholder="Filtre por raça"
          #filter
        />
        <button
          class="btn btn-primary"
          style="background-color:rgb(9, 115, 236); border: none; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);"
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
          *ngFor="let dogInfo of filterDogInfoList"
          [dogInfo]="dogInfo"
        ></app-dog-info>
      </div>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  dogInfoList: DogInfo[] = [];
  filterDogInfoList: DogInfo[] = [];
  dogService: DogService = inject(DogService);

  constructor() {
    this.loadAllDogs();
  }

  async loadAllDogs() {
    this.dogInfoList = await this.dogService.getAllDogInfo();
    this.filterDogInfoList = this.dogInfoList;
  }

  async filterResults(breed: string) {
    if (!breed) {
      this.filterDogInfoList = this.dogInfoList;
      return;
    }

    this.filterDogInfoList = await this.dogService.getDogInfoByBreed(breed);
  }
}
