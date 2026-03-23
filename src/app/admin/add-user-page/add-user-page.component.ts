import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/_models/role';
import { AccountService } from 'src/app/_services/account.service';
import { HeaderService } from 'src/app/_services/header.service';
import { PopupService } from 'src/app/_services/popup.service';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.css', "./_add-user-page-theme.scss"]
})
export class AddUserPageComponent implements OnInit {
  createUserForm = this.fb.group({
    "email": ["", Validators.required],
    "password": ["", Validators.required],
    "confirmPassword": ["", Validators.required]
  });

  // Getters for createUserForm values
  get email() {
    return this.createUserForm.get("email") as FormControl;
  }
  get password() {
    return this.createUserForm.get("password") as FormControl;
  }
  get confirmPassword() {
    return this.createUserForm.get("confirmPassword") as FormControl;
  }

  constructor(
    private fb: FormBuilder, 
    private accountService: AccountService, 
    private headerService: HeaderService, 
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Create User");
  }

  // Creates a new user account in the backend with the submitted form values
  createAccount() {
    // Form validation checks
    if (!this.email.value.includes("@")) {
      this.showErrorPopup("You must provide a valid email. Ex: example@email.com");
      return;
    }

    if (this.password.value.length < 8) {
      this.showErrorPopup("Your password must be at least 8 characters long.")
    }

    if (this.password.value !== this.confirmPassword.value) {
      this.showErrorPopup("Your passwords must match.");
      return;
    }

    if (this.createUserForm.invalid) {
      this.showErrorPopup("You must provide a valid email and password.");
      return;
    }

    this.accountService.createAccount(this.email.value, this.password.value, this.confirmPassword.value, Role.User).subscribe(() => {
      this.showConfirmationPopup("Account successfully created!");
    });
  }

  showConfirmationPopup(confirmationMessage: string) {
    this.popupService.showPopup(confirmationMessage, "confirmation");
  }

  showErrorPopup(errorMessage: string) {
    this.popupService.showPopup(errorMessage, "error");
  }

}
