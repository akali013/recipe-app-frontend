import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signUpForm: FormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
    retypePassword: ["", Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createAccount() {
    console.log(this.signUpForm.value);
  }

}
