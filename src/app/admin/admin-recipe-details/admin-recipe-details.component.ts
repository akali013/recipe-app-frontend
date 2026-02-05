import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/_models/recipe';
import { HeaderService } from 'src/app/_services/header.service';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-admin-recipe-details',
  templateUrl: './admin-recipe-details.component.html',
  styleUrls: ['./admin-recipe-details.component.css']
})
export class AdminRecipeDetailsComponent implements OnInit {
  selectedRecipe?: Recipe
  isLoading: boolean = true;
  previewUrl?: SafeUrl;     // Angular requires images to have a SafeUrl src

  recipeForm: FormGroup = this.fb.group({
    imageUrl: [""],
    name: ["", Validators.required],
    type: ["", Validators.required],
    ingredients: this.fb.array([]),
    instructions: this.fb.array([]),
    source: ["", Validators.required]
  });

  get imageUrl() {
    return this.recipeForm.get("imageUrl") as FormControl;
  }

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

  get source() {
    return this.recipeForm.get("source") as FormControl;
  }

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Edit Recipe");
    this.getSelectedRecipe();
  }

  getSelectedRecipe() {
    this.recipeService.getRecipeById(this.route.snapshot.paramMap.get("id")!).subscribe(recipe => {
      // Initialize form values
      this.selectedRecipe = recipe;
      this.imageUrl.setValue(this.selectedRecipe.imageUrl);
      this.source.setValue(this.selectedRecipe.source);
      this.type.setValue(this.selectedRecipe.type);
      this.name.setValue(this.selectedRecipe.name);
      this.selectedRecipe.ingredients.map(ingredient => {
        this.ingredients.push(this.fb.control(ingredient, Validators.required));
      });
      this.selectedRecipe.instructions.map(instruction => {
        this.instructions.push(this.fb.control(instruction, Validators.required));
      });

      this.isLoading = false;
    });
  }

  addIngredient() {
    this.ingredients.push(this.fb.control("", Validators.required));
  }

  addInstruction() {
    this.instructions.push(this.fb.control("", Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  // Loads the selected recipe image as a blob URL
  loadImagePreview(event: any) {
    let blobUrl = "";

    if (event.target.files[0] && this.fileIsImage(event.target.files[0])) {
      blobUrl = URL.createObjectURL(event.target.files[0]);
      // Sanitize the blobUrl into a SafeUrl so that Angular can show the preview image
      this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
      // Store the blobUrl instead of the previewUrl since it is a string and not a SafeUrl
      this.imageUrl.setValue(blobUrl);
    }
  }

  updateRecipe() {
    const newRecipe: Recipe = {
      id: this.selectedRecipe?.id!,
      name: this.name.value,
      type: this.type.value,
      ingredients: this.ingredients.value,
      instructions: this.instructions.value,
      source: this.source.value,
      imageUrl: this.imageUrl.value
    };

    this.recipeService.updateRecipe(newRecipe).subscribe();
  }

  private fileIsImage(file: File): boolean {
    // https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types
    const fileTypes = [
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

    return fileTypes.includes(file.type);
  }
}
