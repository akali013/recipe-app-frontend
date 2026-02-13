import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/_models/account';
import { Role } from 'src/app/_models/role';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  // Create a form to store and send the user's email and password
  loginForm: FormGroup = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
  account: Account | null = this.accountService.accountValue;   // Currently logged in user info or lack thereof

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Redirect any authenticated user to the recipes table when they try to access the login page 
    if (this.account && this.account.role == Role.User) {
      this.router.navigate(["user/recipes"]);
    }
    // Redirect any admin to the admin recipes table
    if (this.account && this.account.role == Role.Admin) {
      this.router.navigate(["admin/recipes"]);
    }
  }

  login() {
    // Make a login request to the backend with the form data
    this.accountService.login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value).subscribe(
      () => {
        // If the AuthGuard stored a return url, redirect the user back to where they were going
        if (this.route.snapshot.queryParams["returnUrl"]) {
          this.router.navigate([this.route.snapshot.queryParams["returnUrl"]]);
          return;
        }

        if (this.accountService.accountValue?.role == Role.Admin) {
          this.router.navigate(["admin/recipes"]);   // Redirect admins to the admin recipes table in the admin module
          return;
        }

        if (this.accountService.accountValue?.role == Role.User) {
          this.router.navigate(["user/recipes"]);    // Redirect users to the recipes table in the user module
          return;
        }
      }
    );
  }
}
