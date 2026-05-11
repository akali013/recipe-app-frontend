import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { RecipeTablePageComponent } from './recipe-table-page/recipe-table-page.component';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';
import { SettingsPageComponent } from '../_general-pages/settings-page/settings-page.component';
import { UserCreatedRecipesPageComponent } from './user-created-recipes-page/user-created-recipes-page.component';
import { EditRecipePageComponent } from './edit-recipe-page/edit-recipe-page.component';


// Defines all URLs under the user (/user) module
const routes: Routes = [
  {
    path: "", component: UserLayoutComponent,
    children: [
      { path: "recipes", component: RecipeTablePageComponent },
      { path: "recipes/:id", component: RecipeDetailsPageComponent },
      { path: "favorites", component: FavoritesPageComponent },
      { path: "add-recipe", component: AddRecipePageComponent },
      { path: "created-recipes", component: UserCreatedRecipesPageComponent },
      { path: "created-recipes/:id", component: EditRecipePageComponent },
      { path: "settings", component: SettingsPageComponent },
      { path: "**", redirectTo: "recipes", pathMatch: "full" }    // Redirect any unknown URLs to the recipes table
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
