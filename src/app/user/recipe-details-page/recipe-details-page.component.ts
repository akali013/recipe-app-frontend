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
  recipeImageUrl = "";
  imageSource = "";
  stepIndex = 0;    // Marks the instruction step the user is currently on
  isLoading = true;

  constructor(private route: ActivatedRoute, private headerService: HeaderService, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe() {
    const id = this.route.snapshot.paramMap.get("id")!;

    this.recipeService.getRecipeById(id).subscribe(recipe => {
      if (recipe.imageUrl.includes("localhost:")) {
        this.imageSource = `MyRecipes User`;
      }
      else {
        this.imageSource = recipe.imageUrl;
      }
      this.recipeImageUrl = recipe.imageUrl;
      this.selectedRecipe = recipe;
      this.headerService.setHeaderText(this.selectedRecipe.name);
      this.isLoading = false;
      console.log("basduwj");
    });
  }

  previousStep() {
    this.stepIndex - 1 > -1 ? this.stepIndex-- : this.stepIndex = this.selectedRecipe.instructions.length - 1;
  }

  nextStep() {
    this.stepIndex + 1 < this.selectedRecipe.instructions.length ? this.stepIndex++ : this.stepIndex = 0;
  }

  // Determine if the recipe source is missing, a url (API url), or a Guid (User)
  getRecipeSourceText(): string {
    if (this.selectedRecipe.source && this.selectedRecipe.source.includes("http") && this.selectedRecipe.source.includes("-")) {
      return this.selectedRecipe.source;
    }

    if (this.selectedRecipe.source && this.selectedRecipe.source.includes("-")) {
      return "MyRecipes User";
    }

    return this.selectedRecipe.source;
  }
}
