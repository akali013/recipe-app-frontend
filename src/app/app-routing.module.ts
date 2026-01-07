import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeTablePageComponent } from './recipe-table-page/recipe-table-page.component';

const routes: Routes = [
  { path: "recipes", component: RecipeTablePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
