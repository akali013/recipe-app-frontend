import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/_models/recipe';
import { HeaderService } from '../_services/header.service';
import { RecipeService } from '../_services/recipe.service';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details-page.component.html',
  styleUrls: ['./recipe-details-page.component.css']
})
export class RecipeDetailsPageComponent implements OnInit {
  selectedRecipe!: Recipe;

  constructor(private route: ActivatedRoute, private headerService: HeaderService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipe();
    this.headerService.setHeaderText(this.selectedRecipe.name);
  }

  getRecipe() {
    const id = this.route.snapshot.paramMap.get("id")!;
    
    this.recipeService.getRecipeById(id).subscribe(recipe => this.selectedRecipe = recipe);
  }

}
