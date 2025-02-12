import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeNavigationService {
  private homeClickSubject = new Subject<boolean>();
  public homeClick$ = this.homeClickSubject.asObservable();

  notifyHomeClick(isHomeClicked: boolean): void {
    this.homeClickSubject.next(isHomeClicked);
  }
}
