import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, NavbarComponent],
  template: `
    <main class="bg-light" style="font-family: 'Roboto';">
      <app-navbar></app-navbar>
      <section>
        <router-outlet></router-outlet>
      </section>
      <footer class="bg-dark text-light text-start py-4">
        <div class="container">
          <div class="row">
            <p>2025 © André Souza. All Rights Reserved.</p>
          </div>
          <div class="row">
            <div class="col d-flex gap-3">
              <a
                href="https://www.linkedin.com/in/andresouza98/"
                class="text-light"
                target="_blank"
              >
                <span class="icon icon-linkedin"></span>
              </a>
              <a
                href="https://github.com/andreszst"
                class="text-light"
                target="_blank"
              >
                <span class="icon icon-github"></span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Dogs';
}
