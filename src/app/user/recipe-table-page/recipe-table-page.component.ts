import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from 'src/app/_models/recipe';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HeaderService } from '../../_services/header.service';
import { RecipeService } from '../../_services/recipe.service';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-recipe-table-page',
  templateUrl: './recipe-table-page.component.html',
  styleUrls: ['./recipe-table-page.component.css', "./_recipe-table-page-theme.scss"]
})
export class RecipeTablePageComponent implements OnInit {
  // Columns to display on the table 
  // name - recipe's name
  // type - recipe's type
  // favorite - placeholder for favorite button
  tableColumns = ["name", "type", "favorite"];
  recipeDataSource!: MatTableDataSource<Recipe>;    // MatTableDataSource holds Recipe objects and allows table filtering, sorting, and pagination
  favoriteRecipes: Recipe[] = [];   // Tracks the current user's favorite recipes

  // Implement table pagination and sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private recipeService: RecipeService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("My Recipes");
    this.getRecipes();
    this.getFavoriteRecipes();
  }

  // Get all recipes from the backend and populate the table with them
  getRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipeDataSource = new MatTableDataSource(recipes);
      // Enable pagination and sorting
      this.recipeDataSource.paginator = this.paginator;
      this.recipeDataSource.sort = this.sort;
    });
  }

  // Filter the table rows based on the input in the search bar
  searchRecipes(term: string | Event) {
    this.recipeDataSource.filter = term.toString().trim().toLowerCase();
  }

  // Navigate to the recipe-details-page to show the details of the selected recipe via its id
  // Takes a KeyboardEvent to detect when the keyboard is used to select a recipe from the table
  inspectRecipe(recipe: Recipe, event?: KeyboardEvent) {
    // Clicking (no event), Enter, or Spacebar selects a recipe
    if (!event || event.key === "Enter" || event.key === " ") {
      this.router.navigate([`/user/recipes/${recipe.id}`]);
    }
  }

  // Gets all recipes favorited by the current user to track which recipes have already been favorited
  getFavoriteRecipes() {
    this.recipeService.getFavoriteRecipes(this.accountService.accountValue?.id!).subscribe(recipes => {
      this.favoriteRecipes = recipes;
    });
  }

  // Favorites/Unfavorites a recipe when the favorite button of the selected recipe is clicked
  // Clicking or pressing Enter or Spacebar will toggle a recipe when the favorite button is in focus
  toggleFavoriteRecipe(recipe: Recipe, event: MouseEvent | KeyboardEvent) {
    event.stopPropagation();    // Prevents inspecting the selected recipe

    if (event instanceof MouseEvent || (event instanceof KeyboardEvent && (event.key === "Enter" || event.key === " "))) {
      this.recipeService.toggleFavoriteRecipe(recipe, this.accountService.accountValue?.id!).subscribe(() => {
        this.getFavoriteRecipes();
      });
    }
  }

  // Checks if the recipe parameter is a favorite recipe to determine which button should be shown for a recipe
  checkFavoriteRecipe(recipe: Recipe): boolean {
    for (let i = 0; i < this.favoriteRecipes.length; i++) {
      if (this.favoriteRecipes[i].id === recipe.id) {
        return true;
      }
    }

    return false;
  }
}
