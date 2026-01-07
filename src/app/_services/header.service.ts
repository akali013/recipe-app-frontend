import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerContent: BehaviorSubject<string> = new BehaviorSubject("My Recipes");
  headerText: Observable<string> = this.headerContent.asObservable();

  constructor() { }

  setHeaderText(text: string) {
    this.headerContent.next(text);
  }
}
