import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Breedpedia',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Breed details',
  },
];

export default routeConfig;
