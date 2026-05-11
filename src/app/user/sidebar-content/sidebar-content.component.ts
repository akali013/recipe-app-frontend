import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe';
import { AccountService } from 'src/app/_services/account.service';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.css', "./_sidebar-content-theme.scss"]
})
export class SidebarContentComponent implements OnInit {
  // Accept the sidenav object from the user layout to close it when the user switches pages
  @Input() sidebar!: MatSidenav;
  userRecipes: Recipe[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Navigate to the desired page and close the sidebar when navigation is complete
  goToPage(page: string) {
    this.router.navigate([`/user/${page}`]);
    this.sidebar.toggle();
  }
}
