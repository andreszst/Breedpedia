import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-dark bg-dark" style="color: white;">
      <div class="container">
        <a class="navbar-brand" [routerLink]="['/']">
          <img
            class="brand-logo"
            src="/assets/logo-sem-cachorro.svg"
            alt="logo"
            aria-hidden="true"
            (click)="handleClick()"
          />
        </a>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isHomeActive: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomeActive = event.urlAfterRedirects === '/';
      }
    });
  }

  handleClick(): void {
    if (this.isHomeActive) {
      console.log('Reiniciando a aplicação...');
      window.location.reload();
  }
}
}
