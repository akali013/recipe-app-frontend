import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe';
import { AccountService } from 'src/app/_services/account.service';
import { HeaderService } from 'src/app/_services/header.service';
import { PopupService } from 'src/app/_services/popup.service';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-user-created-recipes-page',
  templateUrl: './user-created-recipes-page.component.html',
  styleUrls: ['./user-created-recipes-page.component.css', "./_user-created-recipes-page-theme.scss"]
})
export class UserCreatedRecipesPageComponent implements OnInit {
  // Columns to display on the table 
  // name - recipe's name
  // type - recipe's type
  // remove - placeholder for remove button
  tableColumns = ["name", "type", "remove"];
  createdRecipeDataSource!: MatTableDataSource<Recipe>;    // MatTableDataSource holds Recipe objects and allows table filtering, sorting, and pagination

  // Implement table pagination and sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private headerService: HeaderService,
    private accountService: AccountService,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("My Recipes");
    this.getCreatedRecipes();
  }

  private getCreatedRecipes() {
    this.recipeService.getUserRecipes(this.accountService.accountValue?.id!).subscribe((createdRecipes) => {
      this.createdRecipeDataSource = new MatTableDataSource(createdRecipes);
      // Enable pagination and sorting
      this.createdRecipeDataSource.paginator = this.paginator;
      this.createdRecipeDataSource.sort = this.sort;
    });
  }

  // Filter the table rows based on the input in the search bar
  searchRecipes(term: string | Event) {
    this.createdRecipeDataSource.filter = term.toString().trim().toLowerCase();
  }

  // Navigate to the edit-recipe-page to show/edit the details of the selected recipe via its id
  // Takes a KeyboardEvent to detect when the keyboard is used to select a recipe from the table
  inspectRecipe(recipe: Recipe, event?: KeyboardEvent) {
    // Clicking (no event), Enter, or Spacebar selects a recipe
    if (!event || event.key === "Enter" || event.key === " ") {
      this.router.navigate([`/user/created-recipes/${recipe.id}`]);
    }
  }

  // Removes a recipe from the database
  // Takes a KeyboardEvent to detect when the keyboard is used to delete a recipe
  removeCreatedRecipe(recipe: Recipe, event?: KeyboardEvent) {
    // Clicking (no event), Enter, or Spacebar deletes a recipe
    if (!event || event.key === "Enter" || event.key === " ") {
      this.recipeService.deleteRecipe(recipe).subscribe(() => {
        // Delete the recipe from local storage as well
        if (localStorage.getItem("recentRecipes")) {
          let recentRecipes: Recipe[] = JSON.parse(localStorage.getItem("recentRecipes")!);
          recentRecipes = recentRecipes.filter(r => r.id !== recipe.id);
          localStorage.setItem("recentRecipes", JSON.stringify(recentRecipes));
        }

        this.getCreatedRecipes();
        this.showConfirmationPopup("Recipe removed!");
      });
    }
  }

  private showConfirmationPopup(message: string) {
    this.popupService.showPopup(message, "Confirmation");
  }
}
