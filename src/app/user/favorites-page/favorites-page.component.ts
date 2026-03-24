import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from 'src/app/_models/recipe';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HeaderService } from '../../_services/header.service';
import { RecipeService } from 'src/app/_services/recipe.service';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css', "./_favorites-page-theme.scss"]
})
export class FavoritesPageComponent implements OnInit {
  tableColumns = ["name", "type", "remove"];      // Columns to be shown in the table
  favoritesDataSource: MatTableDataSource<Recipe> = new MatTableDataSource();   // MatTableDataSource enables filtering, sorting, and paginating recipes

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private recipeService: RecipeService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Favorites");
    this.getFavoriteRecipes();
  }

  // Gets the user's favorite recipes from the backend
  getFavoriteRecipes() {
    this.recipeService.getFavoriteRecipes(this.accountService.accountValue?.id!).subscribe((recipes) => {
      // Initialize the table data upon retrieving the favorites
      this.favoritesDataSource = new MatTableDataSource(recipes);
      this.favoritesDataSource.paginator = this.paginator;
      this.favoritesDataSource.sort = this.sort;
    });
  }

  // Search for recipes based on the query in the search bar
  searchFavorites(term: string) {
    this.favoritesDataSource.filter = term.trim().toLowerCase();
  }

  // Go to the recipe details page of the selected favorite recipe
  // event allows keyboard accessibility by inspecting a recipe via a
  // click (no event), Enter key, or Spacebar
  inspectFavorite(recipe: Recipe, event?: KeyboardEvent) {
    if (!event || event.key === "Enter" || event.key === " ") {
      this.router.navigate([`user/recipes/${recipe.id}`]);
    }
  }

  // Removes a favorite recipe from the user's favorites list
  // Clicking or pressing Enter or Spacebar will delete a recipe when the remove button is in focus
  removeFavorite(recipe: Recipe, event: KeyboardEvent | MouseEvent) {
    event.stopPropagation();    // Prevents inspecting the selected recipe

    if (event instanceof MouseEvent || (event instanceof KeyboardEvent && (event.key === "Enter" || event.key === " "))) {
      // Toggling an already favorited recipe unfavorites it
      this.recipeService.toggleFavoriteRecipe(recipe, this.accountService.accountValue?.id!).subscribe(() => {
        this.getFavoriteRecipes();    // Reload the table
      });
    }
  }

}
