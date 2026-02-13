import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderService } from '../../_services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true    // Make standalone since this is shared between the user and admin modules
})
export class HeaderComponent implements OnInit {
  // Accept a user sidebar or admin sidebar with their respective navigation buttons
  @Input() sidebar!: MatSidenav;
  headerText: string = "My Recipes";

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    // Listen for changes to the header text when pages are loaded
    this.headerService.headerText.subscribe(text => this.headerText = text);
  }
}
