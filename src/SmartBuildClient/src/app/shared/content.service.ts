import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private lockMenusSource = new Subject<boolean>();

  constructor() { }

  menusLocked$ = this.lockMenusSource.asObservable();

  lockMenus(lock: boolean = true) {
    this.lockMenusSource.next(lock);
  }
}
