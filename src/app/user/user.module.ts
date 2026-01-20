import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';

import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';
import { RecipeTablePageComponent } from './recipe-table-page/recipe-table-page.component';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

// Standalone components
import { SearchBarComponent } from '../_components/search-bar/search-bar.component';
import { HeaderComponent } from '../_components/header/header.component';

// Angular material
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SettingsPageComponent } from '../_general-pages/settings-page/settings-page.component';

@NgModule({
  declarations: [
    AddRecipePageComponent,
    FavoritesPageComponent,
    RecipeDetailsPageComponent,
    RecipeTablePageComponent,
    SidebarContentComponent,
    UserLayoutComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    SearchBarComponent,
    HeaderComponent,
    SettingsPageComponent
  ],
  exports: [
    UserLayoutComponent
  ]
})
export class UserModule { }
