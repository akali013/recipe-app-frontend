import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HeaderService } from '../_services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() sidebar!: MatSidenav;
  headerText: string = "My Recipes";

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.headerText.subscribe(text => this.headerText = text);
  }
}
