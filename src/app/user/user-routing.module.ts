import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { RecipeTablePageComponent } from './recipe-table-page/recipe-table-page.component';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { AuthGuard } from '../_helpers/auth.guard';


const routes: Routes = [
  {
    path: "", component: UserLayoutComponent,     // /users
    children: [
      { path: "recipes", component: RecipeTablePageComponent, canActivate: [AuthGuard] },
      { path: "recipes/:id", component: RecipeDetailsPageComponent, canActivate: [AuthGuard] },
      { path: "favorites", component: FavoritesPageComponent, canActivate: [AuthGuard] },
      { path: "add-recipe", component: AddRecipePageComponent, canActivate: [AuthGuard] },
      { path: "settings", component: SettingsPageComponent, canActivate: [AuthGuard] },
      { path: "**", redirectTo: "recipes", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
