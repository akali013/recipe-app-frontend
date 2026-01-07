import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from 'src/_models/recipe';
import { RECIPE_DATA } from '../_services/recipe.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit, AfterViewInit {
  tableColumns = ["name", "type", "remove"];
  favoritesDataSource: MatTableDataSource<Recipe> = new MatTableDataSource(RECIPE_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.favoritesDataSource.paginator = this.paginator;
    this.favoritesDataSource.sort = this.sort;
  }

  searchFavorites(term: string) {
    this.favoritesDataSource.filter = term.trim().toLowerCase();
  }

}
