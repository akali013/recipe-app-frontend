import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerContent: BehaviorSubject<string> = new BehaviorSubject("My Recipes");   // Stores the header's text depending on the current page
  headerText: Observable<string> = this.headerContent.asObservable();     // Subscribers are updated with any new header text

  constructor() { }

  // Updates the header's text
  setHeaderText(text: string) {
    this.headerContent.next(text);
  }
}
