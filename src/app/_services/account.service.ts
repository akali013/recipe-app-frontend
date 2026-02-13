import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from 'src/app/_models/account';
import { Role } from '../_models/role';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountSubject: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);    // Stores real-time info about the user
  public account: Observable<Account | null> = this.accountSubject.asObservable();  // Other files can subscribe to this to get real-time account data
  apiUrl = environment.apiUrl + "/accounts";    // API url for all account-related requests (AccountsController)
  headers = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(private router: Router, private http: HttpClient) { }

  // Public snapshot data of the currently logged in account
  public get accountValue() {
    return this.accountSubject.value;
  }

  // Make a POST login request to the backend with an email and password
  login(email: string, password: string): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true, headers: this.headers }).pipe(
      map(account => {
        this.accountSubject.next(account);    // Update subscribers of the new account info
        this.startRefreshTokenTimer();    // JWT refresh token expires ~15 minutes from now
        return account;
      }),
      catchError(this.handleError("login", new Account()))
    );
  }

  // Make a POST request to revoke the user's refresh token, which logs them out from the app
  logout() {
    this.http.post<any>(`${this.apiUrl}/revoke-token`, {}, { withCredentials: true, headers: this.headers }).pipe(
      catchError(this.handleError("logout", new Account()))
    ).subscribe();
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);     // Update subscribers with no current account info since the user logged out
    this.router.navigate(["/login"]);
  }

  // Make a POST request to the backend that refreshes the user's access and refresh tokens,
  // prolonging their access to the app
  refreshToken(): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/refresh-token`, {}, { withCredentials: true, headers: this.headers }).pipe(
      map(account => {
        this.accountSubject.next(account);    // Update subscribers with the updated account info
        this.startRefreshTokenTimer();
        return account;
      }),
      catchError(this.handleError("refreshToken", new Account()))
    );
  }

  // Make a POST request to create a new user account with an email and password
  register(email: string, password: string, confirmPassword: string): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/register`, { email, password, confirmPassword }, { headers: this.headers }).pipe(
      catchError(this.handleError("createAccount", new Account()))
    );
  }

  // Returns all accounts from the database via a GET request to /accounts
  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl).pipe(
      catchError(this.handleError("getAllAccounts", [new Account()]))
    );
  }

  // Returns the account with the specified id via a GET request to /accounts/{id}
  getAccountById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError("getAccountById", new Account()))
    );
  }

  // Admin method to manually create accounts with an email, password, and role via a POST request to /accounts
  createAccount(email: string, password: string, confirmPassword: string, role: Role): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, { email, password, confirmPassword, role }, { headers: this.headers }).pipe(
      catchError(this.handleError("createAccount", new Account()))
    );
  }

  // Updates the email or password of the user with the specified id via a PUT request to /accounts/{id}
  updateAccount(id: string, updatedInfo = {}): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, updatedInfo, { headers: this.headers }).pipe(
      map(account => {
        // Update the current account if it was updated and notify subscribers
        if (account.id === this.accountValue?.id) {
          account = { ...this.accountValue, ...account };
          this.accountSubject.next(account);
        }

        return account;
      }),
      catchError(this.handleError("updateAccount", new Account()))
    );
  }

  // Deletes the account with the specified id via a DELETE request to /accounts/{id}
  // and returns the deleted account
  deleteAccount(id: string): Observable<Account> {
    return this.http.delete<Account>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => {
        // Log out the user if they are deleted
        if (this.accountValue?.id === id) {
          this.logout();
        }
      }),
      catchError(this.handleError("deleteAccount", new Account()))
    );
  }

  // Get all accounts that have a User role via a GET request to /accounts/users
  getAllUsers(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/users`, { headers: this.headers }).pipe(
      catchError(this.handleError("getAllUsers", [new Account()]))
    );
  }


  private refreshTokenTimeout?: NodeJS.Timeout;

  private startRefreshTokenTimer() {
    // Parse JSON object from base64 encoded JWT
    const jwtBase64 = this.accountValue!.jwtToken!.split(".")[1];
    const jwtToken = JSON.parse(atob(jwtBase64));

    // Refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  // Source: https://v14.angular.io/tutorial/toh-pt6
  // Handles any errors from calling the API
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
