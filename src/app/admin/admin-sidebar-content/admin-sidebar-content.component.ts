import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar-content',
  templateUrl: './admin-sidebar-content.component.html',
  styleUrls: ['./admin-sidebar-content.component.css']
})
export class AdminSidebarContentComponent implements OnInit {
  @Input() sidebar!: MatSidenav;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPage(route: string) {
    this.router.navigate([`admin/${route}`]);
    this.sidebar.toggle();
  }
}
