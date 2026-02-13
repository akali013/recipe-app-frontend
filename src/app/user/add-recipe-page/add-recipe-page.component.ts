import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../../_services/recipe.service';
import { Recipe } from 'src/app/_models/recipe';
import { HeaderService } from '../../_services/header.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-recipe-page',
  templateUrl: './add-recipe-page.component.html',
  styleUrls: ['./add-recipe-page.component.css']
})
export class AddRecipePageComponent implements OnInit {
  recipeData: FormData = new FormData();    // Form data to be sent to the backend via the multipart/form type that allows files
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
  // Same logic as admin-recipe-details where blobUrl is a placeholder for recipe image data
  // and previewUrl is a SafeUrl of an image that can be shown with the [src] property
  blobUrl = "";
  previewUrl?: SafeUrl;

  // Getters for recipeForm values
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

  // Adds an ingredient input to the ingredients section
  addIngredient() {
    this.ingredients.push(new FormControl("", Validators.required));
  }

  // Adds an instruction input to the instructions section
  addInstruction() {
    this.instructions.push(new FormControl("", Validators.required));
  }

  // Removes the specified ingredient
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  // Removes the specified instruction
  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  createRecipe() {
    // Prepare form data to be sent to the backend
    this.recipeData.set("name", this.name.value);
    this.recipeData.set("type", this.type.value);
    this.recipeData.set("ingredients", this.ingredients.value);
    this.recipeData.set("instructions", this.instructions.value);
    this.recipeData.set("imageUrl", this.imageUrl.value);

    this.recipeService.createRecipe(this.recipeData).subscribe(recipe => console.log(recipe));
  }

  // Shows a preview of the user's selected image from their file system
  loadImagePreview(event: any) {
    // Check that the submitted file is an image
    if (event.target.files[0] && this.fileIsImage(event.target.files[0])) {
      this.blobUrl = URL.createObjectURL(event.target.files[0]);
      // Sanitize the blobUrl into a SafeUrl so that Angular can show the preview image
      this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(this.blobUrl);
  
      // Include the file name and extension in the form data
      this.imageUrl.setValue(event.target.files[0].name);
       // The third parameter will be the filename under the Content-Disposition header so .NET's IFormFile can retrieve it and the file extension
      this.recipeData.set("recipeImage", event.target.files[0], this.imageUrl.value);
    }
  }

  // Checks if the given file has a supported image type
  // Source: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types
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
