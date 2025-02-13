import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: ` <footer class="bg-dark text-light text-start py-4">
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
  </footer>`,
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {}
