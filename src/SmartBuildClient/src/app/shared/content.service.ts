import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private lockMenusSource = new Subject<boolean>();
  private toastrSource = new Subject<string>();

  constructor() { }

  menusLocked$ = this.lockMenusSource.asObservable();
  toastrShow$ = this.toastrSource.asObservable();

  lockMenus(lock: boolean = true) {
    this.lockMenusSource.next(lock);
  }

  showErrorMessage(message: string) {
    this.toastrSource.next(message);
  }
}
