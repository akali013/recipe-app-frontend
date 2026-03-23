import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// This service manages the content of the app-wide popup for confirmation or error messages

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private message: BehaviorSubject<string> = new BehaviorSubject("");   // BehaviorSubjects update the message in real-time
  private type: BehaviorSubject<string> = new BehaviorSubject("error");   // Can be "error" or "confirmation"
  private isVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  popupContent: Observable<string> = this.message.asObservable();     // For reading updated message values outside this component
  popupType: Observable<string> = this.type.asObservable();
  popupVisibility: Observable<boolean> = this.isVisible.asObservable();
  popupDuration = 5000;   // Popup duration in ms
  intervalId?: NodeJS.Timeout;

  constructor() { }

  showPopup(message: string, type: string) {
    this.message.next(message);
    this.type.next(type);
    this.isVisible.next(true);

    // Remove any previous messages if actions are done quickly
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
    this.intervalId = setTimeout(() => this.isVisible.next(false), this.popupDuration);
  }
}
