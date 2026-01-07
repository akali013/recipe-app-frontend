import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../_services/recipe.service';
import { Recipe } from 'src/_models/recipe';
import { HeaderService } from '../_services/header.service';

@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.css']
})
export class AddRecipePageComponent implements OnInit {
  recipeForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    type: ["", Validators.required],
    ingredients: this.fb.array([
      new FormControl("")
    ]),
    instructions: this.fb.array([
      new FormControl("")
    ])
  });

  get name() {
    return this.recipeForm.get("name") as FormControl;
  }

  get type() {
    return this.recipeForm.get("type") as FormControl;
  }

  get ingredients() {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  get instructions() {
    return this.recipeForm.get("instructions") as FormArray;
  }

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Add a Recipe");
  }

  addIngredient() {
    this.ingredients.push(new FormControl("", Validators.required));
  }

  addInstruction() {
    this.instructions.push(new FormControl("", Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  createRecipe() {
    const newRecipe: Recipe = {
      id: String(Math.round(Math.random() * 1000)),
      name: this.name.value,
      type: this.type.value,
      ingredients: this.ingredients.value,
      instructions: this.instructions.value,
      source: "You"
    };

    this.recipeService.createRecipe(newRecipe);
  }
}
