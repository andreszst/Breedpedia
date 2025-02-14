import { DogService } from './dog.service';
import { BreedData } from '../interfaces/breed.interface';
import { CardData } from '../interfaces/card.interface';

describe('DogService - getBreedData', () => {
  let service: DogService;

  beforeEach(() => {
    service = new DogService();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return the correctly formatted breed data when given a valid breed id', async () => {
    const mockBreedData = {
      weight: {
        imperial: '6 - 13',
        metric: '3 - 6',
      },
      height: {
        imperial: '9 - 11.5',
        metric: '23 - 29',
      },
      id: 1,
      name: 'Affenpinscher',
      bred_for: 'Small rodent hunting, lapdog',
      breed_group: 'Toy',
      life_span: '10 - 12 years',
      temperament:
        'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
      origin: 'Germany, France',
      reference_image_id: 'BJa4kxc4X',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockBreedData),
    });

    const result = await service.getBreedDetailsData('1');

    const expected: BreedData = {
      name: 'Affenpinscher',
      weight: '3 - 6',
      height: '23 - 29',
      life_span: '10 - 12 years',
      bred_for: 'Small rodent hunting, lapdog',
      temperament:
        'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
      reference_image_id: 'BJa4kxc4X',
    };

    expect(result).toEqual(expected);
    expect(global.fetch).toHaveBeenCalledWith(`${service.breeds_url}1`);
  });

  it('should return the correct card data array for a given breed id', async () => {
    const breedId = '24';
    const mockCardData = [
      {
        breeds: [
          {
            weight: { imperial: '14 - 16', metric: '6 - 7' },
            height: { imperial: '10 - 11', metric: '25 - 28' },
            id: '24',
            name: 'Australian Terrier',
            country_code: 'AU',
            bred_for: 'Cattle herdering, hunting snakes and rodents',
            breed_group: 'Terrier',
            life_span: '15 years',
            temperament:
              'Spirited, Alert, Loyal, Companionable, Even Tempered, Courageous',
            reference_image_id: 'r1Ylge5Vm',
          },
        ],
        id: 'r1Ylge5Vm',
        url: 'https://cdn2.thedogapi.com/images/r1Ylge5Vm_1280.jpg',
        width: '1081',
        height: '720',
      },
      {
        breeds: [
          {
            weight: { imperial: '80 - 100', metric: '36 - 45' },
            height: { imperial: '25.5 - 27.5', metric: '65 - 70' },
            id: '144',
            name: 'Komondor',
            bred_for: 'Sheep guardian',
            breed_group: 'Working',
            life_span: '10 - 12 years',
            temperament:
              'Steady, Fearless, Affectionate, Independent, Gentle, Calm',
            reference_image_id: 'Bko0fl547',
          },
        ],
        id: 'Bko0fl547',
        url: 'https://cdn2.thedogapi.com/images/Bko0fl547_1280.jpg',
        width: '1030',
        height: '772',
      },
      {
        breeds: [
          {
            weight: { imperial: '3 - 6', metric: '1 - 3' },
            height: { imperial: '7.5 - 10.5', metric: '19 - 27' },
            id: '211',
            name: 'Russian Toy',
            breed_group: 'Toy',
            life_span: '10 - 12 years',
            reference_image_id: 'HkP7Vxc4Q',
          },
        ],
        id: 'HkP7Vxc4Q',
        url: 'https://cdn2.thedogapi.com/images/HkP7Vxc4Q_1280.jpg',
        width: '645',
        height: '380',
      },
      {
        breeds: [
          {
            weight: { imperial: '60 - 120', metric: '27 - 54' },
            height: { imperial: '22 - 27', metric: '56 - 69' },
            id: '10',
            name: 'American Bulldog',
            breed_group: 'Working',
            life_span: '10 - 12 years',
            temperament:
              'Friendly, Assertive, Energetic, Loyal, Gentle, Confident, Dominant',
            reference_image_id: 'pk1AAdloG',
          },
        ],
        id: 't4pZFktBB',
        url: 'https://cdn2.thedogapi.com/images/t4pZFktBB.jpg',
        width: '1024',
        height: '768',
      },
      {
        breeds: [
          {
            weight: { imperial: '65 - 75', metric: '29 - 34' },
            height: { imperial: '21 - 28', metric: '53 - 71' },
            id: '14',
            name: 'American Foxhound',
            country_code: 'US',
            bred_for: 'Fox hunting, scent hound',
            breed_group: 'Hound',
            life_span: '8 - 15 years',
            temperament:
              'Kind, Sweet-Tempered, Loyal, Independent, Intelligent, Loving',
            reference_image_id: 'S14n1x9NQ',
          },
        ],
        id: 'p4xvDeEpW',
        url: 'https://cdn2.thedogapi.com/images/p4xvDeEpW.jpg',
        width: '680',
        height: '453',
      },
      {
        breeds: [
          {
            weight: { imperial: '30 - 45', metric: '14 - 20' },
            height: { imperial: '18 - 22', metric: '46 - 56' },
            id: '50',
            name: 'Border Collie',
            bred_for: 'Sheep herder',
            breed_group: 'Herding',
            life_span: '12 - 16 years',
            temperament:
              'Tenacious, Keen, Energetic, Responsive, Alert, Intelligent',
            reference_image_id: 'sGQvQUpsp',
          },
        ],
        id: '38KoA9gGB',
        url: 'https://cdn2.thedogapi.com/images/38KoA9gGB.jpg',
        width: '1080',
        height: '1350',
      },
      {
        breeds: [
          {
            weight: { imperial: '30 - 45', metric: '14 - 20' },
            height: { imperial: '18 - 22', metric: '46 - 56' },
            id: '50',
            name: 'Border Collie',
            bred_for: 'Sheep herder',
            breed_group: 'Herding',
            life_span: '12 - 16 years',
            temperament:
              'Tenacious, Keen, Energetic, Responsive, Alert, Intelligent',
            reference_image_id: 'sGQvQUpsp',
          },
        ],
        id: 'CVbP_4N2Z',
        url: 'https://cdn2.thedogapi.com/images/CVbP_4N2Z.jpg',
        width: '1080',
        height: '1080',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockCardData),
    });

    const result = await service.getCarouselData(breedId);

    const expected: CardData[] = [
      {
        id: 'r1Ylge5Vm',
        photo: 'https://cdn2.thedogapi.com/images/r1Ylge5Vm_1280.jpg',
        breed: 'Australian Terrier',
        breed_id: '24',
      },
      {
        id: 'Bko0fl547',
        photo: 'https://cdn2.thedogapi.com/images/Bko0fl547_1280.jpg',
        breed: 'Komondor',
        breed_id: '144',
      },
      {
        id: 'HkP7Vxc4Q',
        photo: 'https://cdn2.thedogapi.com/images/HkP7Vxc4Q_1280.jpg',
        breed: 'Russian Toy',
        breed_id: '211',
      },
      {
        id: 't4pZFktBB',
        photo: 'https://cdn2.thedogapi.com/images/t4pZFktBB.jpg',
        breed: 'American Bulldog',
        breed_id: '10',
      },
      {
        id: 'p4xvDeEpW',
        photo: 'https://cdn2.thedogapi.com/images/p4xvDeEpW.jpg',
        breed: 'American Foxhound',
        breed_id: '14',
      },
      {
        id: '38KoA9gGB',
        photo: 'https://cdn2.thedogapi.com/images/38KoA9gGB.jpg',
        breed: 'Border Collie',
        breed_id: '50',
      },
      {
        id: 'CVbP_4N2Z',
        photo: 'https://cdn2.thedogapi.com/images/CVbP_4N2Z.jpg',
        breed: 'Border Collie',
        breed_id: '50',
      },
    ];

    expect(result).toEqual(expected);
    expect(global.fetch).toHaveBeenCalledWith(
      `${service.search_url}&breed_ids=${breedId}&limit=8`
    );
  });
});
