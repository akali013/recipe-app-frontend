import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from 'src/app/_models/recipe';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HeaderService } from '../../_services/header.service';
import { RecipeService } from '../../_services/recipe.service';

@Component({
  selector: 'app-recipe-table-page',
  templateUrl: './recipe-table-page.component.html',
  styleUrls: ['./recipe-table-page.component.css']
})
export class RecipeTablePageComponent implements OnInit {
  // Columns to display on the table 
  // name - recipe's name
  // type - recipe's type
  // favorite - placeholder for favorite button
  tableColumns = ["name", "type", "favorite"];    
  recipeDataSource!: MatTableDataSource<Recipe>;    // MatTableDataSource holds Recipe objects and allows table filtering, sorting, and pagination

  // Implement table pagination and sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private headerService: HeaderService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("My Recipes");
    this.getRecipes();
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
  inspectRecipe(recipe: Recipe) {
    this.router.navigate([`/user/recipes/${recipe.id}`]);
  }
}
