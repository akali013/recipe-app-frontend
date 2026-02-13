import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css']
})
export class SidebarContentComponent implements OnInit {
  // Accept the sidenav object from the user layout to close it when the user switches pages
  @Input() sidebar!: MatSidenav;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Navigate to the desired page and close the sidebar when navigation is complete
  goToPage(page: string) {
    this.router.navigate([`/user/${page}`]);
    this.sidebar.toggle();
  }
}
