import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/_models/account';
import { AccountService } from 'src/app/_services/account.service';
import { HeaderService } from 'src/app/_services/header.service';

@Component({
  selector: 'app-admin-users-table',
  templateUrl: './admin-users-table.component.html',
  styleUrls: ['./admin-users-table.component.css']
})
export class AdminUsersTableComponent implements OnInit {
  tableColumns = ["id", "email", "created", "updated", "ban"];
  usersDataSource!: MatTableDataSource<Account>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private accountService: AccountService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.setHeaderText("Users");
    this.getUsers();
  }

  getUsers() {
    this.accountService.getAllUsers().subscribe((users) => {
      this.usersDataSource = new MatTableDataSource(users);
      this.usersDataSource.paginator = this.paginator;
      this.usersDataSource.sort = this.sort;
    });
  }

  searchUsers(term: string | Event) {
    this.usersDataSource.filter = term.toString().trim().toLowerCase();
  }

  inspectUser(user: Account) {
    console.log(user);
  }

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
