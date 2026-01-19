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
  private accountSubject: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
  public account: Observable<Account | null> = this.accountSubject.asObservable();
  apiUrl = environment.apiUrl + "/accounts";
  headers = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(private router: Router, private http: HttpClient) { }

  public get accountValue() {
    return this.accountSubject.value;
  }

  login(email: string, password: string): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true, headers: this.headers }).pipe(
      map(account => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }),
      catchError(this.handleError("login", new Account()))
    );
  }

  logout() {
    this.http.post<any>(`${this.apiUrl}/revoke-token`, {}, { withCredentials: true, headers: this.headers }).pipe(
      catchError(this.handleError("logout", new Account()))
    ).subscribe();
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(["/login"]);
  }

  refreshToken(): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/refresh-token`, {}, { withCredentials: true, headers: this.headers }).pipe(
      map(account => {
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
        return account;
      }),
      catchError(this.handleError("refreshToken", new Account()))
    );
  }

  register(email: string, password: string, confirmPassword: string): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/register`, { email, password, confirmPassword }, { headers: this.headers }).pipe(
      catchError(this.handleError("createAccount", new Account()))
    );
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl).pipe(
      catchError(this.handleError("getAllAccounts", [new Account()]))
    );
  }

  getAccountById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError("getAccountById", new Account()))
    );
  }

  createAccount(email: string, password: string, confirmPassword: string, role: Role): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, { email, password, confirmPassword, role }, { headers: this.headers }).pipe(
      catchError(this.handleError("createAccount", new Account()))
    );
  }

  updateAccount(id: string, updatedInfo = {}): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, updatedInfo, { headers: this.headers }).pipe(
      map(account => {
        // Update the current account if it was updated
        if (account.id === this.accountValue?.id) {
          account = { ...this.accountValue, ...account };
          this.accountSubject.next(account);
        }

        return account;
      }),
      catchError(this.handleError("updateAccount", new Account()))
    );
  }

  changeAccountBanStatus(id: string, banStatus: boolean): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, { IsBanned: banStatus }, { headers: this.headers }).pipe(
      catchError(this.handleError("banAccount", new Account()))
    );
  }

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
