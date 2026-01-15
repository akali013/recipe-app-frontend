import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../_services/header.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  email = new FormControl("", Validators.required);
  password = new FormControl("", Validators.required);
  editingState = "viewing";

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Settings");
  }

  updateEmail() {
    console.log(this.email.value);
    this.editingState = "viewing";
  }

  updatePassword() {
    console.log(this.password.value);
    this.editingState = "viewing";
  }

  logOut() {
    console.log("logged out");
  }
}
