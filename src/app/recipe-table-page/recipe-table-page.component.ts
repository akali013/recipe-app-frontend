import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from 'src/_models/recipe';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HeaderService } from '../_services/header.service';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-recipe-table-page',
  templateUrl: './recipe-table-page.component.html',
  styleUrls: ['./recipe-table-page.component.css']
})
export class RecipeTablePageComponent implements OnInit {
  tableColumns = ["name", "type", "favorite"];    // Columns to display on the table (name is used instead of recipe for sorting)
  recipeDataSource!: MatTableDataSource<Recipe>;

  // Implement table pagination and sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private headerService: HeaderService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("My Recipes");
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipeDataSource = new MatTableDataSource(recipes);
      this.recipeDataSource.paginator = this.paginator;
      this.recipeDataSource.sort = this.sort;
    });
  }

  searchRecipes(term: string) {
    this.recipeDataSource.filter = term.trim().toLowerCase();
  }

  inspectRecipe(recipe: Recipe) {
    this.router.navigate([`/recipes/${recipe.id}`]);
  }
}
