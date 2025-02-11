import { Injectable } from '@angular/core';
import { CardData } from './card-data';
import { BreedData } from './breed-data';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private cache: CardData[] = [];

  images_url =
    'https://api.thedogapi.com/v1/images/search?api_key=live_yZRUR4bCmfw0LozwO4DD5atQ0oHIuwuc8OOsHM3s9Wk0El5GpudGIy3Rct0iQbrE&has_breeds=true&order&mime_types=jpg';

  async getCardData(): Promise<CardData[]> {
    if (this.cache.length > 0) {
      return this.cache;
    }
    const response = await fetch(`${this.images_url}&limit=25`);
    const data = await response.json();
    const uniqueBreeds = new Set();
    this.cache = data
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
      .sort((a: CardData, b: CardData) => a.breed.localeCompare(b.breed));
    return this.cache;
  }

  async getCardDataByBreed(breedName: string): Promise<CardData[]> {
    const breedResponse = await fetch('https://api.thedogapi.com/v1/breeds');
    const breeds = await breedResponse.json();
    const breed = breeds.find((b: any) =>
      b.name.toLowerCase().includes(breedName.toLowerCase().trim())
    );

    if (!breed) {
      throw new Error('Breed not found');
    }

    const response = await fetch(
      `${this.images_url}&breed_ids=${breed.id}&limit=1`
    );
    const data = await response.json();
    return data.map((dog: any) => ({
      id: dog.id,
      photo: dog.url,
      breed: dog.breeds[0].name,
      breed_id: dog.breeds[0].id,
    }));
  }

  async getCardDataByBreedId(breedId: string): Promise<CardData[]> {
    const response = await fetch(
      `${this.images_url}&breed_ids=${breedId}&limit=4`
    );
    const data = await response.json();
    return data.map((dog: any) => ({
      id: dog.id,
      photo: dog.url,
      breed: dog.breeds[0].name,
      breed_id: dog.breeds[0].id,
    }));
  }

  async getBreedData(breed_id: string): Promise<BreedData> {
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
