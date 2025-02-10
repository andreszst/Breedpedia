import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule],
  template: `
    <main>
      <nav class="navbar bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand" [routerLink]="['/']">
              <img
                class="brand-logo"
                src="/assets/logo.svg"
                alt="logo"
                aria-hidden="true"
              />
          </a>
        </div>
      </nav>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Dogs';
}
