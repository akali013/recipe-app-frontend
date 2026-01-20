import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminRecipeTableComponent } from './admin-recipe-table/admin-recipe-table.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminSidebarContentComponent } from './admin-sidebar-content/admin-sidebar-content.component';

// Standalone components
import { SearchBarComponent } from '../_components/search-bar/search-bar.component';
import { HeaderComponent } from '../_components/header/header.component';

// Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SettingsPageComponent } from '../_general-pages/settings-page/settings-page.component';



@NgModule({
  declarations: [
    AdminRecipeTableComponent,
    AdminLayoutComponent,
    AdminSidebarContentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    SearchBarComponent,
    HeaderComponent,
    SettingsPageComponent
  ]
})
export class AdminModule { }
