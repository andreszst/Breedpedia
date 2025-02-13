import { Injectable } from '@angular/core';
import { CardData } from './card.interface';
import { BreedData } from './breed.interface';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private cache: CardData[] = [];

  search_url =
    'https://api.thedogapi.com/v1/images/search?api_key=live_yZRUR4bCmfw0LozwO4DD5atQ0oHIuwuc8OOsHM3s9Wk0El5GpudGIy3Rct0iQbrE&has_breeds=true';
  breeds_url = 'https://api.thedogapi.com/v1/breeds/';

  async getCardData(): Promise<CardData[]> {
    if (this.cache.length > 0) {
      return this.cache;
    }
    const response = await fetch(`${this.search_url}&limit=25`);
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
        breed: dog.breeds[0].name.replace('Miniature', 'Mini'),
        breed_id: dog.breeds[0].id,
      }))
      .sort((a: CardData, b: CardData) => a.breed.localeCompare(b.breed));
    return this.cache;
  }

  async getCardDataByBreed(breedName: string): Promise<CardData[]> {
    const breedResponse = await fetch(this.breeds_url);
    const breeds = await breedResponse.json();
    const matchedBreeds = breeds.filter((b: any) =>
      b.name.toLowerCase().includes(breedName.toLowerCase().trim())
    );

    if (matchedBreeds.length === 0) {
      throw new Error('Breed not found');
    }

    const results: CardData[] = [];
    for (const breed of matchedBreeds) {
      if (results.length >= 10) break;
      const response = await fetch(
        `${this.search_url}&breed_ids=${breed.id}&limit=1`
      );
      const data = await response.json();
      const images = data.map((dog: any) => ({
        id: dog.id,
        photo: dog.url,
        breed: dog.breeds[0].name.replace('Miniature', 'Mini'),
        breed_id: dog.breeds[0].id,
      }));
      results.push(...images);
    }
    return results;
  }

  async getCardDataByBreedId(breedId: string): Promise<CardData[]> {
    const response = await fetch(
      `${this.search_url}&breed_ids=${breedId}&limit=4`
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
    const response = await fetch(`${this.breeds_url}${breed_id}`);
    const breed = await response.json();
    return {
      name: breed.name,
      weight: breed.weight.metric,
      height: breed.height.metric,
      life_span: breed.life_span,
      bred_for: breed.bred_for,
      temperament: breed.temperament,
      reference_image_id: breed.reference_image_id,
    };
  }

  constructor() {}
}
