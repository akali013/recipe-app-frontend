import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Account } from 'src/app/_models/account';
import { AccountService } from 'src/app/_services/account.service';
import { HeaderService } from 'src/app/_services/header.service';

@Component({
  selector: 'app-admin-users-table',
  templateUrl: './admin-users-table.component.html',
  styleUrls: ['./admin-users-table.component.css']
})
export class AdminUsersTableComponent implements OnInit {
  // Define table columns to be shown
  // id: user's id
  // email: user's email
  // created: user's creation date
  // updated: date and time when user was last updated
  // ban: user's ban status
  tableColumns = ["id", "email", "created", "updated", "ban"];  
  usersDataSource!: MatTableDataSource<Account>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private accountService: AccountService, private headerService: HeaderService, private router: Router) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Users");
    this.getUsers();
  }

  // Get all users from the backend and initialize the table with this data
  getUsers() {
    this.accountService.getAllUsers().subscribe((users) => {
      this.usersDataSource = new MatTableDataSource(users);
      this.usersDataSource.paginator = this.paginator;
      this.usersDataSource.sort = this.sort;
    });
  }

  // Angular's mat-table automatically handles filtering if the row contains the term
  searchUsers(term: string | Event) {
    this.usersDataSource.filter = term.toString().trim().toLowerCase();
  }

  // When a user is clicked, go to edit-user page to see their details
  inspectUser(user: Account) {
    this.router.navigate([`admin/edit-user/${user.id}`]);
  }

  // Rather than delete the user, update their account's ban status
  toggleBanStatus(user: Account) {
    this.accountService.updateAccount(user.id!, { "Email": user.email, "IsBanned": !user.isBanned }).subscribe((updatedUser) => {
      // Rerender the table with the updated user
      this.usersDataSource.data = this.usersDataSource.data.map(u => {
        if (u.email === updatedUser.email) {
          return updatedUser;
        }
        return u;
      });
    });
  }

}
