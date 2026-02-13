import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe';
import { HeaderService } from 'src/app/_services/header.service';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-admin-recipe-table',
  templateUrl: './admin-recipe-table.component.html',
  styleUrls: ['./admin-recipe-table.component.css']
})
export class AdminRecipeTableComponent implements OnInit {
  // Columns to be shown on the table
  // name: Recipe's name
  // author: Recipe's source that can be a user id, MealsDB API link, or unknown (N/A)
  // delete: Header for all delete recipe buttons
  tableColumns = ["name", "author", "delete"];    
  recipeDataSource!: MatTableDataSource<Recipe>;    // MatTableDataSource stores Recipe objects and allows table filtering, sorting, and pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private recipeService: RecipeService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Recipes");
    this.getRecipes();
  }

  // Gets all recipes from the backend
  getRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      // When the recipes are received, populate the table with them and enable
      // pagination and sorting
      this.recipeDataSource = new MatTableDataSource(recipes);
      this.recipeDataSource.paginator = this.paginator;
      this.recipeDataSource.sort = this.sort;
    });
  }

  // Checks if the recipe's source is missing, a MealsDB API link, or user-generated.
  getAuthorType(recipe: Recipe): string {
    // Missing source
    if (!recipe.source) {
      return "N/A";
    }

    // MealsDB API link
    if (recipe.source.includes('http')) {
      return "Link";
    }

    // User's id otherwise
    return "User";
  }

  // Capture any search terms from the search bar and pass it to the MatTableDataSource
  // to filter all rows by those terms
  searchRecipes(term: string | Event) {
    this.recipeDataSource.filter = term.toString().trim().toLowerCase();
  }

  // Deletes a recipe from the backend
  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe).subscribe();
  }

  // Goes to the admin-recipe-details page that shows the
  // info about the selected recipe
  inspectRecipe(recipe: Recipe) {
    this.router.navigate([`admin/recipes/${recipe.id}`]);
  }

}
