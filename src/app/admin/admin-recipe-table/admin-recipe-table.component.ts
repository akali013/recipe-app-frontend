import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from 'src/app/_models/recipe';
import { HeaderService } from 'src/app/_services/header.service';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-admin-recipe-table',
  templateUrl: './admin-recipe-table.component.html',
  styleUrls: ['./admin-recipe-table.component.css']
})
export class AdminRecipeTableComponent implements OnInit {
  tableColumns = ["name", "author", "delete"];
  recipeDataSource!: MatTableDataSource<Recipe>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private recipeService: RecipeService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Recipes");
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipeDataSource = new MatTableDataSource(recipes);
      this.recipeDataSource.paginator = this.paginator;
      this.recipeDataSource.sort = this.sort;
    });
  }

  // Checks if the recipe's source is missing, a link, or user-generated.
  getAuthorType(recipe: Recipe): string {
    if (!recipe.source) {
      return "N/A";
    }

    if (recipe.source.includes('http')) {
      return "Link";
    }

    return "User";
  }

  searchRecipes(term: string | Event) {
    this.recipeDataSource.filter = term.toString().trim().toLowerCase();
  }

  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe).subscribe();
  }

  inspectRecipe(recipe: Recipe) {
    console.log(recipe);
  }

}
