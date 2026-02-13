import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRecipeTableComponent } from './admin-recipe-table/admin-recipe-table.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SettingsPageComponent } from '../_general-pages/settings-page/settings-page.component';
import { AdminUsersTableComponent } from './admin-users-table/admin-users-table.component';
import { AddUserPageComponent } from './add-user-page/add-user-page.component';
import { AdminRecipeDetailsComponent } from './admin-recipe-details/admin-recipe-details.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';

// URL paths within the admin module (/admin)
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,      // Allows the header and sidebar to be consistent across all admin pages
    children: [
      { path: "recipes", component: AdminRecipeTableComponent },
      { path: "recipes/:id", component: AdminRecipeDetailsComponent },
      { path: "users", component: AdminUsersTableComponent },
      { path: "edit-user/:id", component: AdminEditUserComponent },
      { path: "add-user", component: AddUserPageComponent },
      { path: "settings", component: SettingsPageComponent },
      { path: "**", redirectTo: "recipes", pathMatch: "full" }    // Redirect any unknown urls to the recipes table
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
