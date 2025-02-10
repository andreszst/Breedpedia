import { Injectable } from '@angular/core';
import { DogInfo } from './doginfo';
import { BreedInfo } from './breedinfo';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private dogInfoCache: DogInfo[] = [];

  url =
    'https://api.thedogapi.com/v1/images/search?api_key=live_yZRUR4bCmfw0LozwO4DD5atQ0oHIuwuc8OOsHM3s9Wk0El5GpudGIy3Rct0iQbrE&has_breeds=true&order&mime_types=jpg';

  async getAllDogInfo(): Promise<DogInfo[]> {
    if (this.dogInfoCache.length > 0) {
      return this.dogInfoCache;
    }
    const response = await fetch(`${this.url}&limit=25`);
    const data = await response.json();
    const uniqueBreeds = new Set();
    this.dogInfoCache = data
      .filter((dog: any) => {
        const breedId = dog.breeds[0].id;
        if (uniqueBreeds.has(breedId)) {
          return false;
        }
        uniqueBreeds.add(breedId);
        return true;
      })
      .slice(0, 15)
      .map((dog: any) => ({
        id: dog.id,
        photo: dog.url,
        breed: dog.breeds[0].name,
        breed_id: dog.breeds[0].id,
      }))
      .sort((a: DogInfo, b: DogInfo) => a.breed.localeCompare(b.breed));
    return this.dogInfoCache;
  }

  async getDogInfoByBreed(breedName: string): Promise<DogInfo[]> {
    const breedResponse = await fetch('https://api.thedogapi.com/v1/breeds');
    const breeds = await breedResponse.json();
    const breed = breeds.find((b: any) => b.name.toLowerCase().includes(breedName.toLowerCase().trim()));

    if (!breed) {
      throw new Error('Breed not found');
    }

    const response = await fetch(`${this.url}&breed_ids=${breed.id}&limit=1`);
    const data = await response.json();
    return data.map((dog: any) => ({
      id: dog.id,
      photo: dog.url,
      breed: dog.breeds[0].name,
      breed_id: dog.breeds[0].id,
    }));
  }

  async getDogInfoByBreedId(breedId: string): Promise<DogInfo[]> {
    const response = await fetch(`${this.url}&breed_ids=${breedId}&limit=5`);
    const data = await response.json();
    return data.map((dog: any) => ({
      id: dog.id,
      photo: dog.url,
      breed: dog.breeds[0].name,
      breed_id: dog.breeds[0].id,
    }));
  }

  async getBreedInfo(breed_id: string): Promise<BreedInfo> {
    const response = await fetch(
      `https://api.thedogapi.com/v1/breeds/${breed_id}`
    );
    const breed = await response.json();
    return {
      name: breed.name,
      weight: breed.weight.metric,
      height: breed.height.metric,
      life_span: breed.life_span,
      bred_for: breed.bred_for,
      temperament: breed.temperament,
      origin: breed.origin,
      reference_image_id: breed.reference_image_id,
    };
  }

  constructor() {}
}