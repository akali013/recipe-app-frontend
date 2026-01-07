import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from 'src/_models/recipe';
import { RECIPE_DATA } from '../_services/recipe.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-recipe-table-page',
  templateUrl: './recipe-table-page.component.html',
  styleUrls: ['./recipe-table-page.component.css']
})
export class RecipeTablePageComponent implements OnInit, AfterViewInit {
  tableColumns = ["name", "type", "favorite"];    // Columns to display on the table (name is used instead of recipe for sorting)
  recipeDataSource: MatTableDataSource<Recipe> = new MatTableDataSource(RECIPE_DATA);

  // Implement table pagination and sorting
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.recipeDataSource.paginator = this.paginator;
    this.recipeDataSource.sort = this.sort;
  }

  searchRecipes(term: string) {
    this.recipeDataSource.filter = term.trim().toLowerCase();
  }
}
