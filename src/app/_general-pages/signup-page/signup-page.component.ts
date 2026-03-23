import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { PopupService } from 'src/app/_services/popup.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css', "./_signup-page-theme.scss"]
})
export class SignupPageComponent implements OnInit {
  signUpForm: FormGroup = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    retypePassword: ["", Validators.required]
  });

  // Getters for form controls
  get email() {
    return this.signUpForm.get("email") as FormControl;
  }

  get password() {
    return this.signUpForm.get("password") as FormControl;
  }

  get retypePassword() {
    return this.signUpForm.get("retypePassword") as FormControl;
  }

  constructor(
    private fb: FormBuilder, 
    private accountService: AccountService, 
    private router: Router,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
  }

  // Create a new user account in the backend with the submitted email and password
  createAccount() {
    if (this.email.value.length === 0 || !this.email.value.includes("@")) {
      this.showErrorPopup("A valid email is required. Ex: email@example.com");
      return;
    }

    if (this.password.value.length < 8) {
      this.showErrorPopup("Your password must contain at least 8 characters.");
      return;
    }

    if (this.password.value !== this.retypePassword.value) {
      this.showErrorPopup("Your passwords must match.");
      return;
    }

    this.accountService.register(this.email.value, this.password.value, this.retypePassword.value).subscribe();
    this.router.navigate(["/login"]).then(() => {
      this.showConfirmationPopup("Account successfully created!");
    });
  }

  private showConfirmationPopup(message: string) {
    this.popupService.showPopup(message, "confirmation");
  }

  private showErrorPopup(message: string) {
    this.popupService.showPopup(message, "error");
  }

}
