import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeTablePageComponent } from './recipe-table-page/recipe-table-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';

const routes: Routes = [
  { path: "recipes", component: RecipeTablePageComponent },
  { path: "recipes/:id", component: RecipeDetailsPageComponent },
  { path: "favorites", component: FavoritesPageComponent },
  { path: "add-recipe", component: AddRecipePageComponent },
  { path: "**", redirectTo: "recipes", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
