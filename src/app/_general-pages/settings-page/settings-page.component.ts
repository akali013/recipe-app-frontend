import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../_services/header.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  standalone: true    // Standalone since the settings page is shared by the user and admin modules
})
export class SettingsPageComponent implements OnInit {
  // Individual form controls for individual editing
  // Populate email field with the email of the current user (or admin)
  email = new FormControl(this.accountService.accountValue?.email, Validators.required);
  password = new FormControl("", Validators.required);
  confirmPassword = new FormControl("", Validators.required);
  // React-esque state to declaratively show different sections of the page that can be
  // editingEmail, editingPassword, or viewing
  public editingState: BehaviorSubject<string> = new BehaviorSubject("viewing");

  constructor(private headerService: HeaderService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Settings");
    // Enable/disable inputs every time editingState changes
    this.editingState.subscribe((state) => this.toggleInputs(state));
  }

  // Update the user's email by sending the new valid email to the backend
  updateEmail() {
    if (this.email.value === "" || !this.email.value?.includes("@")) {
      return;
    }

    const updateObject = {
      email: this.email.value
    };
    this.accountService.updateAccount(this.accountService.accountValue?.id!, updateObject).subscribe(() => console.log("updated email"));
    this.editingState.next("viewing");
  }

  // Change the user's password by sending a request to the backend
  // and make sure the passwords match
  updatePassword() {
    if (this.password.value !== this.confirmPassword.value) {
      return;
    }

    const updateObject = {
      email: this.accountService.accountValue?.email,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    };

    this.accountService.updateAccount(this.accountService.accountValue?.id!, updateObject).subscribe(() => console.log("updated info"));
    this.editingState.next("viewing");
  }

  logOut() {
    this.accountService.logout();
  }

  // Enable/disable the appropriate inputs depending on the current editingState
  private toggleInputs(state: string) {
    switch (state) {
      case "viewing":
        this.email.disable();
        this.password.disable();
        this.confirmPassword.disable();
        break;
      case "editingEmail":
        this.email.enable();
        this.password.disable();
        this.confirmPassword.disable();
        break;
      case "editingPassword":
        this.email.disable();
        this.password.enable();
        this.confirmPassword.enable();
        break;
    }
  }
}
