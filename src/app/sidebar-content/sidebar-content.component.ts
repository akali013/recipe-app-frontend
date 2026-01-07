import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css']
})
export class SidebarContentComponent implements OnInit {
  @Input() sidebar!: MatSidenav;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPage(page: string) {
    this.router.navigate([page]);
    this.sidebar.toggle();
  }
}
