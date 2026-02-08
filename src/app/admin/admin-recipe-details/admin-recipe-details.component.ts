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
  blobUrl = "";
  previewUrl?: SafeUrl;     // Angular requires images to have a SafeUrl src
  recipeData: FormData = new FormData();   // Send the recipe data to the backend via the multipart/form-data type to be picked up by the .NET IFormFile type
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

  // Get the chosen recipe from the backend via the id in the URL
  getSelectedRecipe() {
    this.recipeService.getRecipeById(this.route.snapshot.paramMap.get("id")!).subscribe(recipe => {
      // Initialize form values
      this.selectedRecipe = recipe;
      this.imageUrl.setValue(this.selectedRecipe.imageUrl);
      this.source.setValue(this.selectedRecipe.source);
      this.type.setValue(this.selectedRecipe.type);
      this.name.setValue(this.selectedRecipe.name);
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

  // Load the recipe image that the user selected from their files
  loadImagePreview(event: any) {
    if (!event.target.files[0] || !this.fileIsImage(event.target.files[0])) return;

    // Show preview image via blob url that encodes the image data
    this.blobUrl = URL.createObjectURL(event.target.files[0]);
    // Sanitize the blobUrl into a SafeUrl so that Angular can show the preview image
    this.previewUrl = this.sanitizer.bypassSecurityTrustUrl(this.blobUrl);

    this.imageUrl.setValue(event.target.files[0].name);
    // The third parameter is the filename under the Content-Disposition header so .NET's IFormFile can retrieve it and the file extension
    this.recipeData.set("recipeImage", event.target.files[0], this.imageUrl.value);
  }

  updateRecipe() {
    // Load recipe information into the FormData object so it can be picked up by the [FromForm] controller attribute 
    this.recipeData.set("id", this.selectedRecipe?.id!);
    this.recipeData.set("name", this.name.value);
    this.recipeData.set("type", this.type.value);
    this.recipeData.set("ingredients", this.ingredients.value);
    this.recipeData.set("instructions", this.instructions.value);
    this.recipeData.set("source", this.source.value);

    this.recipeService.updateRecipe(this.selectedRecipe?.id!, this.recipeData).subscribe();
  }

  // Checks if the file parameter has any of the supported image file types
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
