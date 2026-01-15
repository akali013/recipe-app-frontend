import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe';
import { HeaderService } from '../../_services/header.service';
import { RecipeService } from '../../_services/recipe.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-details-page',
  templateUrl: './recipe-details-page.component.html',
  styleUrls: ['./recipe-details-page.component.css']
})
export class RecipeDetailsPageComponent implements OnInit {
  selectedRecipe!: Recipe;
  recipeImageUrl: SafeUrl | string = "";
  imageSource = "";
  stepIndex = 0;    // Marks the instruction step the user is currently on

  constructor(private route: ActivatedRoute, private headerService: HeaderService, private recipeService: RecipeService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getRecipe();
    this.headerService.setHeaderText(this.selectedRecipe.name);
  }

  getRecipe() {
    const id = this.route.snapshot.paramMap.get("id")!;
    
    this.recipeService.getRecipeById(id).subscribe(recipe => {
      // If the recipe's image url is a blob url (user-generated), then sanitize it so Angular can show it
      if (recipe.imageUrl.includes("blob:")) {
        this.recipeImageUrl = this.sanitizer.bypassSecurityTrustUrl(recipe.imageUrl);
        this.imageSource = ""
      }
      else {
        this.recipeImageUrl = recipe.imageUrl;
        this.imageSource = recipe.imageUrl;
      }
      this.selectedRecipe = recipe;
    });
  }

  previousStep() {
    this.stepIndex - 1 > -1 ? this.stepIndex-- : this.stepIndex = this.selectedRecipe.instructions.length - 1;
  }

  nextStep() {
    this.stepIndex + 1 < this.selectedRecipe.instructions.length ? this.stepIndex++ : this.stepIndex = 0;
  }
}
