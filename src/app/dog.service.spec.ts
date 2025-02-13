import { DogService } from './dog.service';
import { CardData } from './card.interface';
import { BreedData } from './breed.interface';

describe('DogService', () => {
  let service: DogService;
  global.fetch = jest.fn();

  beforeEach(() => {
    service = new DogService();
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve(new Response(JSON.stringify([])))
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cached data if available', async () => {
    const mockCardData: CardData[] = [{ id: '1', photo: 'url1', breed: 'Breed1', breed_id: '1' }];
    service['cache'] = mockCardData;
    const data = await service.getCardData();
    expect(data).toEqual(mockCardData);
    expect(global.fetch).not.toHaveBeenCalled();
  });


  it('should fetch and process card data', async () => {
    const mockResponse = [
      {
        id: '1',
        url: 'url1',
        breeds: [{ id: 1, name: 'Breed1 Miniature' }],
      },
      {
        id: '2',
        url: 'url2',
        breeds: [{ id: 2, name: 'Breed2' }],
      },
       {
        id: '3',
        url: 'url3',
        breeds: [{ id: 1, name: 'Breed1 Miniature' }],
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse))
    );

    const data = await service.getCardData();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.thedogapi.com/v1/images/search?api_key=live_yZRUR4bCmfw0LozwO4DD5atQ0oHIuwuc8OOsHM3s9Wk0El5GpudGIy3Rct0iQbrE&has_breeds=true&limit=25'
    );
    expect(data).toEqual([
      { id: '1', photo: 'url1', breed: 'Breed1 Mini', breed_id: 1 },
      { id: '2', photo: 'url2', breed: 'Breed2', breed_id: 2 },
    ]);
  });


  it('should fetch card data by breed', async () => {
    const mockBreedsResponse = [{ id: 1, name: 'Breed1' }, { id: 2, name: 'Breed2' }];
    const mockImageResponse = [{ id: '1', url: 'url1', breeds: [{ id: 1, name: 'Breed1' }] }];

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce(new Response(JSON.stringify(mockBreedsResponse)))
      .mockResolvedValueOnce(new Response(JSON.stringify(mockImageResponse)));


    const data = await service.getCardDataByBreed('breed1');

    expect(global.fetch).toHaveBeenCalledWith('https://api.thedogapi.com/v1/breeds/');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.thedogapi.com/v1/images/search?api_key=live_yZRUR4bCmfw0LozwO4DD5atQ0oHIuwuc8OOsHM3s9Wk0El5GpudGIy3Rct0iQbrE&has_breeds=true&breed_ids=1&limit=1'
    );
    expect(data).toEqual([{ id: '1', photo: 'url1', breed: 'Breed1', breed_id: 1 }]);
  });

  it('should throw error if breed not found', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify([]))
    );
    await expect(service.getCardDataByBreed('nonexistent')).rejects.toThrow('Breed not found');
  });

  it('should fetch card data by breed id', async () => {
    const mockResponse = [{ id: '1', url: 'url1', breeds: [{ id: 1, name: 'Breed1' }] }];
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse))
    );

    const data = await service.getCardDataByBreedId('1');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.thedogapi.com/v1/images/search?api_key=live_yZRUR4bCmfw0LozwO4DD5atQ0oHIuwuc8OOsHM3s9Wk0El5GpudGIy3Rct0iQbrE&has_breeds=true&breed_ids=1&limit=4'
    );
    expect(data).toEqual([{ id: '1', photo: 'url1', breed: 'Breed1', breed_id: 1 }]);
  });

  it('should fetch breed data', async () => {
    const mockBreedData = {
      name: 'Breed1',
      weight: { metric: '20 - 30' },
      height: { metric: '50 - 60' },
      life_span: '10 - 12 years',
      bred_for: 'Hunting',
      temperament: 'Friendly',
      reference_image_id: 'image123',
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(mockBreedData))
    );

    const data: BreedData = await service.getBreedData('1');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.thedogapi.com/v1/breeds/1'
    );
    expect(data).toEqual({
      name: 'Breed1',
      weight: '20 - 30',
      height: '50 - 60',
      life_span: '10 - 12 years',
      bred_for: 'Hunting',
      temperament: 'Friendly',
      reference_image_id: 'image123',
    });
  });
});