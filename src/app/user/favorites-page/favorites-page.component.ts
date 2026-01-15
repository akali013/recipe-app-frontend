import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from 'src/app/_models/recipe';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HeaderService } from '../../_services/header.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit, AfterViewInit {
  tableColumns = ["name", "type", "remove"];
  favoritesDataSource: MatTableDataSource<Recipe> = new MatTableDataSource([] as Recipe[]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Favorites");
  }

  ngAfterViewInit(): void {
    this.favoritesDataSource.paginator = this.paginator;
    this.favoritesDataSource.sort = this.sort;
  }

  searchFavorites(term: string) {
    this.favoritesDataSource.filter = term.trim().toLowerCase();
  }

  inspectFavorite(recipe: Recipe) {
    this.router.navigate([`/recipes/${recipe.id}`]);
  }

}
