import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRecipeTableComponent } from './admin-recipe-table/admin-recipe-table.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SettingsPageComponent } from '../_general-pages/settings-page/settings-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: "recipes", component: AdminRecipeTableComponent },
      { path: "settings", component: SettingsPageComponent },
      { path: "**", redirectTo: "recipes", pathMatch: "full" }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
