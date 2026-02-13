// Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Admin module components
import { AdminRoutingModule } from './admin-routing.module';
import { AdminRecipeTableComponent } from './admin-recipe-table/admin-recipe-table.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminSidebarContentComponent } from './admin-sidebar-content/admin-sidebar-content.component';
import { AdminUsersTableComponent } from './admin-users-table/admin-users-table.component';
import { AddUserPageComponent } from './add-user-page/add-user-page.component';
import { AdminRecipeDetailsComponent } from './admin-recipe-details/admin-recipe-details.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';

// Standalone components
import { SearchBarComponent } from '../_components/search-bar/search-bar.component';
import { HeaderComponent } from '../_components/header/header.component';
import { SettingsPageComponent } from '../_general-pages/settings-page/settings-page.component';

// Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AdminRecipeTableComponent,
    AdminLayoutComponent,
    AdminSidebarContentComponent,
    AdminUsersTableComponent,
    AddUserPageComponent,
    AdminRecipeDetailsComponent,
    AdminEditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule,
    SearchBarComponent,
    HeaderComponent,
    SettingsPageComponent
  ]
})
export class AdminModule { }
