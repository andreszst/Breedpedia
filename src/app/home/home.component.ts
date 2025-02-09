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
    <section>
      <form>
        <input type="text" placeholder="Filtre por raça" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Buscar
        </button>
      </form>
    </section>
    <section class="results">
      <app-dog-info
        *ngFor="let dogInfo of filterDogInfoList"
        [dogInfo]="dogInfo"
      ></app-dog-info>
    </section>
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