import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Recipe } from 'src/app/_models/recipe';
import { HeaderService } from 'src/app/_services/header.service';
import { RecipeService } from 'src/app/_services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/_models/account';
import { AccountService } from 'src/app/_services/account.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupService } from 'src/app/_services/popup.service';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {
  // Columns for the user's recipes table
  // Name - recipe's name
  // Delete - header for every delete recipe button
  tableColumns: string[] = ["name", "delete"];
  userRecipesDataSource!: MatTableDataSource<Recipe>;   // MatTableDataSource stores Recipe objects and allows table filtering, sorting, and pagination
  selectedUser?: Account;     // User being currently edited
  userForm: FormGroup = this.fb.group({
    "email": ["", Validators.required],
    "password": ["", Validators.required],
    "retypePassword": ["", Validators.required]
  });
  formState: string = "viewing";      // Detects when the email or password is being changed.

  get email() {
    return this.userForm.get("email") as FormControl;
  }

  get password() {
    return this.userForm.get("password") as FormControl;
  }

  get retypePassword() {
    return this.userForm.get("retypePassword") as FormControl;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private headerService: HeaderService,
    private accountService: AccountService,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Edit User");
    this.getUser();
    this.getUserRecipes();
    this.email.disable();
    this.password.disable();
  }

  // Get the user's info from the backend via their id in the route params
  getUser() {
    this.accountService.getAccountById(this.route.snapshot.paramMap.get("id")!).subscribe(user => {
      this.selectedUser = user;
      this.email.setValue(user.email);
    });
  }

  // Retrieve only this user's recipes from the backend and populate the table with them
  // using the user's id in the url
  getUserRecipes() {
    this.recipeService.getUserRecipes(this.route.snapshot.paramMap.get("id")!).subscribe((recipes: Recipe[]) => {
      // When the user's recipes are retrieved, populate the table and enable sorting and pagination
      this.userRecipesDataSource = new MatTableDataSource(recipes);
      this.userRecipesDataSource.paginator = this.paginator;
      this.userRecipesDataSource.sort = this.sort;
    });
  }

  // Allows editing the email when the edit email button is clicked
  editEmail() {
    this.formState = "editingEmail";
    this.email.enable();
  }

  // Allows editing the password when the edit password button is clicked
  editPassword() {
    this.formState = "editingPassword";
    this.password.enable();
  }

  // Edits the user's email or password depending on whichever was edited
  editUser() {
    if (this.formState === "editingEmail") {
      if (this.email.value === "" || !this.email.value.includes("@")) {
        this.showErrorPopup("You must enter a valid email.");
        return;
      }

      this.accountService.updateAccount(this.selectedUser?.id!, { email: this.email.value }).subscribe(() => {
        this.formState = "viewing";
        this.showConfirmationPopup("User updated!");
      });
    }
    else {
      if (this.password.value === "" || this.password.value.length < 8) {
        this.showErrorPopup("The password must be at least 8 characters long.");
        return;
      }

      if (this.password.value !== this.retypePassword.value) {
        this.showErrorPopup("The passwords must match.");
        return;
      }

      this.accountService.updateAccount(this.selectedUser?.id!, { password: this.password.value, confirmPassword: this.retypePassword.value }).subscribe(() => {
        this.formState = "viewing";
        this.showConfirmationPopup("User updated!");
      });
    }
  }

  // Go to the admin-recipe-details page for the selected recipe
  // The event parameter allows keyboard accessibility by inspecting a recipe via
  // a click (no event), Enter key, or Spacebar
  inspectRecipe(recipe: Recipe, event?: KeyboardEvent) {
    if (!event || event.key === "Enter" || event.key === " ") {
      this.router.navigate([`admin/recipes/${recipe.id}`]);
    }
  }

  // Delete the user's recipe from the backend
  deleteRecipe(recipe: Recipe, event: Event) {
    event.stopPropagation();      // Prevents inspecting the deleted recipe
    this.recipeService.deleteRecipe(recipe).subscribe(() => {
      this.showConfirmationPopup("Recipe deleted.");
      this.getUserRecipes();      // Refresh the table
    });
  }

  showConfirmationPopup(message: string) {
    this.popupService.showPopup(message, "confirmation");
  }

  showErrorPopup(message: string) {
    this.popupService.showPopup(message, "error");
  }
}
