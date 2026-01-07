import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/_models/recipe';
import { RECIPE_DATA } from '../_services/recipe.service';
import { HeaderService } from '../_services/header.service';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details-page.component.html',
  styleUrls: ['./recipe-details-page.component.css']
})
export class RecipeDetailsPageComponent implements OnInit {
  selectedRecipe!: Recipe;

  constructor(private route: ActivatedRoute, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.getRecipe();
    this.headerService.setHeaderText(this.selectedRecipe.name);
  }

  getRecipe() {
    const id = this.route.snapshot.paramMap.get("id");
    this.selectedRecipe = RECIPE_DATA.find(r => r.id === id)!;
  }

}
