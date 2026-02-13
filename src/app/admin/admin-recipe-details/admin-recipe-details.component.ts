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
  selectedRecipe?: Recipe   // Recipe for the current page
  isLoading: boolean = true;
  blobUrl = "";     // Placeholder URL for a recipe image to be converted into a SafeUrl
  previewUrl?: SafeUrl;     // Angular requires images to have a SafeUrl src
  // Send the recipe data to the backend via the multipart/form-data type to be picked up by the .NET IFormFile type
  // This allows image data to be sent and stored in the backend
  recipeData: FormData = new FormData();
  recipeForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    type: ["", Validators.required],
    // Ingredients and instructions are form arrays so they can have as many form controls as needed
    ingredients: this.fb.array([]),
    instructions: this.fb.array([]),
    source: ["", Validators.required],
    imageUrl: [""]      // Images are not required
  });

  // Getters for form values
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

  get imageUrl() {
    return this.recipeForm.get("imageUrl") as FormControl;
  }

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Edit Recipe");
    this.getSelectedRecipe();
  }

  // Get the chosen recipe from the backend via the id in the URL
  getSelectedRecipe() {
    this.recipeService.getRecipeById(this.route.snapshot.paramMap.get("id")!).subscribe(recipe => {
      this.selectedRecipe = recipe;
      // Initialize form values
      this.name.setValue(this.selectedRecipe.name);
      this.type.setValue(this.selectedRecipe.type);
      this.source.setValue(this.selectedRecipe.source);
      this.imageUrl.setValue(this.selectedRecipe.imageUrl);
      // Push new form controls (inputs) for each ingredient and instruction
      this.selectedRecipe.ingredients.map(ingredient => {
        this.ingredients.push(this.fb.control(ingredient, Validators.required));
      });
      this.selectedRecipe.instructions.map(instruction => {
        this.instructions.push(this.fb.control(instruction, Validators.required));
      });

      this.isLoading = false;
    });
  }

  // Adds a new form control to the ingredients form array
  addIngredient() {
    this.ingredients.push(this.fb.control("", Validators.required));
  }

  // Adds a new form control to the instructions form array
  addInstruction() {
    this.instructions.push(this.fb.control("", Validators.required));
  }

  // Removes the specified ingredient from the form
  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  // Removes the specified instruction from the form
  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  // Load the recipe image that the user selected from their file system
  loadImagePreview(event: any) {
    // Check that only image files are submitted
    if (!event.target.files[0] || !this.fileIsImage(event.target.files[0])) return;

    // Encode the preview image data into a readable blob url
    this.blobUrl = URL.createObjectURL(event.target.files[0]);
    // Sanitize the blobUrl into a SafeUrl so that Angular can show the preview image
    this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(this.blobUrl);

    // Store the file name and extension in the imageUrl form field
    this.imageUrl.setValue(event.target.files[0].name);
    // Prepare the image to be sent to the backend where
    // the third parameter will be the file name under the Content-Disposition header 
    // so .NET's IFormFile can retrieve it and the file extension
    this.recipeData.set("recipeImage", event.target.files[0], this.imageUrl.value);
  }

  updateRecipe() {
    // Load recipe information into the FormData object so it can be picked up by the .NET [FromForm] controller attribute 
    this.recipeData.set("id", this.selectedRecipe?.id!);
    this.recipeData.set("name", this.name.value);
    this.recipeData.set("type", this.type.value);
    this.recipeData.set("ingredients", this.ingredients.value);
    this.recipeData.set("instructions", this.instructions.value);
    this.recipeData.set("source", this.source.value);

    // Update call to backend
    this.recipeService.updateRecipe(this.selectedRecipe?.id!, this.recipeData).subscribe();
  }

  // Checks if the file parameter has any of the supported image file types
  // Source: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types
  private fileIsImage(file: File): boolean {
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
