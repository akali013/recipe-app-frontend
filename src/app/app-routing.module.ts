import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeTablePageComponent } from './recipe-table-page/recipe-table-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';

const routes: Routes = [
  { path: "recipes", component: RecipeTablePageComponent },
  { path: "favorites", component: FavoritesPageComponent },
  { path: "add-recipe", component: AddRecipePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
