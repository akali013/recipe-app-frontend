import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Recipe } from 'src/app/_models/recipe';
import { HeaderService } from 'src/app/_services/header.service';
import { RecipeService } from 'src/app/_services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {
  // Columns for the user's recipes table
  // Name - recipe's name
  // Delete - header for every delete recipe button
  tableColumns: string[] = ["name", "delete"];
  userRecipesDataSource!: MatTableDataSource<Recipe>;   // MatTableDataSource stores Recipe objects and allows table filtering, sorting, and pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private headerService: HeaderService, private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Edit User");
    this.getUserRecipes();
  }

  // Retrieve only this user's recipes from the backend and populate the table with them
  // using the user's id in the url
  getUserRecipes() {
    this.recipeService.getUserRecipes(this.route.snapshot.paramMap.get("id")!).subscribe((recipes: Recipe[]) => {
      // When the user's recipes are retrieved, populate the table and enable sorting and pagination
      this.userRecipesDataSource = new MatTableDataSource(recipes);
      this.userRecipesDataSource.paginator = this.paginator;
      this.userRecipesDataSource.sort = this.sort;
    });
  }

  // Go to the admin-recipe-details page for the selected recipe
  inspectRecipe(recipe: Recipe) {
    this.router.navigate([`admin/recipes/${recipe.id}`]);
  }

  // Delete the user's recipe from the backend
  deleteRecipe(recipe: Recipe) {
    this.recipeService.deleteRecipe(recipe).subscribe();
  }

}
