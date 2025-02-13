import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent],
  template: `
    <main class="bg-light" style="font-family: 'Roboto';">
      <app-navbar></app-navbar>
      <section>
        <router-outlet></router-outlet>
      </section>
      <app-footer></app-footer>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Dogs';
}
