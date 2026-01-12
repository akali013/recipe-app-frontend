import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeTablePageComponent } from './recipe-table-page/recipe-table-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';

// Angular Material components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './header/header.component';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';
import { AddRecipePageComponent } from './add-recipe-page/add-recipe-page.component';
import { RecipeDetailsPageComponent } from './recipe-details-page/recipe-details-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipeTablePageComponent,
    SearchBarComponent,
    HeaderComponent,
    SidebarContentComponent,
    FavoritesPageComponent,
    AddRecipePageComponent,
    RecipeDetailsPageComponent,
    SettingsPageComponent,
    LoginPageComponent,
    SignupPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
