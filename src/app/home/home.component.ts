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
    <div class="container text-center" style="margin-top: 20px; margin-bottom: 20px;">
      <form class="form-inline d-flex">
        <input
          style="max-width:300px;"
          class="form-control me-2"
          type="text"
          placeholder="Filtre por raça"
          #filter
        />
        <button
          class="btn btn-primary" style="background-color:rgb(15, 142, 216); border-color:rgb(15, 142, 216);"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Buscar
        </button>
      </form>
    </div>
    <div class="container text-left">
      <div class="row row-cols-5">
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
