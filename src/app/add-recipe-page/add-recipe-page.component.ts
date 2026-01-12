import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../_services/recipe.service';
import { Recipe } from 'src/_models/recipe';
import { HeaderService } from '../_services/header.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    ]),
    imageUrl: [""]
  });
  blobUrl = "";
  previewUrl?: SafeUrl;

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
  
  get imageUrl() {
    return this.recipeForm.get("imageUrl") as FormControl;
  }

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private headerService: HeaderService, private sanitizer: DomSanitizer) { }

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
      id: "",   // Id is set in the backend
      name: this.name.value,
      type: this.type.value,
      ingredients: this.ingredients.value,
      instructions: this.instructions.value,
      source: "You",
      imageUrl: this.imageUrl.value
    };

    this.recipeService.createRecipe(newRecipe).subscribe(recipe => console.log(recipe));
  }

  // Loads the selected recipe image as a blob URL
  loadImagePreview(event: any) {
    if (event.target.files[0] && this.fileIsImage(event.target.files[0])) {
      this.blobUrl = URL.createObjectURL(event.target.files[0]);
      // Sanitize the blobUrl into a SafeUrl so that Angular can show the preview image
      this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(this.blobUrl);
      // Store the blobUrl instead of the previewUrl since it is a string and not a SafeUrl
      this.imageUrl.setValue(this.blobUrl);
    }
  }

  fileIsImage(file: File): boolean {
    const imageTypes = [
      "image/apng",
      "image/bmp",
      "image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/svg+xml",
      "image/tiff",
      "image/webp",
      "image/x-icon",
    ];

    return imageTypes.includes(file.type);
  }
}
