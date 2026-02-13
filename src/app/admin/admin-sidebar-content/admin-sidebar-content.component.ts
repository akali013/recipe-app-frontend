import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar-content',
  templateUrl: './admin-sidebar-content.component.html',
  styleUrls: ['./admin-sidebar-content.component.css']
})
export class AdminSidebarContentComponent implements OnInit {
  @Input() sidebar!: MatSidenav;    // Accept the sidenav object from admin-layout so it can be toggled

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Navigates to the selected page and closes the sidebar
  goToPage(route: string) {
    this.router.navigate([`admin/${route}`]);
    this.sidebar.toggle();
  }
}
