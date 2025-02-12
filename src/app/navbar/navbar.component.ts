// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { HomeNavigationService } from '../home-navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-dark bg-dark">
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
  public isHomeClicked: boolean = false;

  constructor(
    private router: Router,
    private homeNavigationService: HomeNavigationService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomeClicked = event.urlAfterRedirects === '/';
      }
    });
  }

  handleClick(): void {
    if (this.isHomeClicked) {
      this.homeNavigationService.notifyHomeClick(true);
    }
  }
}
