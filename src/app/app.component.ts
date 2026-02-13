import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';
import { Account } from 'src/app/_models/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  account?: Account | null;

  constructor(accountService: AccountService) {
    // Get the currently logged-in user's info
    accountService.account.subscribe(a => this.account = a);
  }
}
