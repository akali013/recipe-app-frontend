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
  loginForm: FormGroup = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
  account: Account | null = this.accountService.accountValue;

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Redirect any authenticated user to the recipes table when they try to access the login page 
    if (this.account && this.account.role == Role.User) {
      this.router.navigate(["user/recipes"]);
    }
  }

  login() {
    this.accountService.login(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value).subscribe(
      () => {
        if (this.route.snapshot.queryParams["returnUrl"]) {
          this.router.navigate([this.route.snapshot.queryParams["returnUrl"]]);
        }

        if (this.accountService.accountValue?.role == Role.Admin) {
          this.router.navigate(["/user/recipes"]);    // !! Redirect to recipes table until admin pages are implemented
        }

        if (this.accountService.accountValue?.role == Role.User) {
          this.router.navigate(["/user/recipes"]);    // Redirect users to recipes table
        }
      }
    );
  }
}
