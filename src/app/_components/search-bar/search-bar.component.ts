import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: true
})
export class SearchBarComponent implements OnInit {
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateSearchTerm(term: string) {
    this.searchEvent.emit(term);
  }
}
