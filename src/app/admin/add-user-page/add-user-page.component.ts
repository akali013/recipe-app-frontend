import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Role } from 'src/app/_models/role';
import { AccountService } from 'src/app/_services/account.service';
import { HeaderService } from 'src/app/_services/header.service';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.css']
})
export class AddUserPageComponent implements OnInit {
  createUserForm = this.fb.group({
    "email": ["", Validators.required],
    "password": ["", Validators.required],
    "confirmPassword": ["", Validators.required]
  });

  get email() {
    return this.createUserForm.get("email") as FormControl;
  }
  get password() {
    return this.createUserForm.get("password") as FormControl;
  }
  get confirmPassword() {
    return this.createUserForm.get("confirmPassword") as FormControl;
  }

  constructor(private fb: FormBuilder, private accountService: AccountService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Create User");
  }

  createAccount() {
    this.accountService.createAccount(this.email.value, this.password.value, this.confirmPassword.value, Role.User).subscribe();
  }

}
