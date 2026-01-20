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
  standalone: true
})
export class SettingsPageComponent implements OnInit {
  email = new FormControl(this.accountService.accountValue?.email, Validators.required);
  password = new FormControl("", Validators.required);
  confirmPassword = new FormControl("", Validators.required);
  public editingState: BehaviorSubject<string> = new BehaviorSubject("viewing");

  constructor(private headerService: HeaderService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Settings");
    this.editingState.subscribe((state) => this.toggleInputs(state));
  }

  updateEmail() {
    if (this.email.value === "") {
      return;
    }

    const updateObject = {
      email: this.email.value
    };

    this.accountService.updateAccount(this.accountService.accountValue?.id!, updateObject).subscribe(() => console.log("updated email"));
    this.editingState.next("viewing");
  }

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
