import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: true    // Make standalone since multiple modules can use this generic search bar
})
export class SearchBarComponent implements OnInit {
  // Make an event called "searchEvent" available to any parent components
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // Trigger searchEvent when the user types in the search bar with the user's search term
  updateSearchTerm(term: string) {
    this.searchEvent.emit(term);
  }
}
