import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signUpForm: FormGroup = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    retypePassword: ["", Validators.required]
  });

  get email() {
    return this.signUpForm.get("email") as FormControl;
  }

  get password() {
    return this.signUpForm.get("password") as FormControl;
  }

  get retypePassword() {
    return this.signUpForm.get("retypePassword") as FormControl;
  }

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  createAccount() {
    this.accountService.register(this.email.value, this.password.value, this.retypePassword.value).subscribe();
    this.router.navigate(["/login"]);
  }

}
