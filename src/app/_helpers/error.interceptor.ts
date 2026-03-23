import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { PopupService } from '../_services/popup.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService, private router: Router, private popupService: PopupService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Intercept any incoming errors from the backend
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].includes(err.status) && this.accountService.accountValue) {
          // Log the user out if a 401 Unauthorized or 403 Forbidden is returned from the api
          this.accountService.logout();
          this.showErrorPopup("Please login again.");
        }

        // Log the error message from the backend
        const error = (err && err.error && err.error.message) || err.statusText;
        console.error(err);
        
        return throwError(() => error);
      })
    );
  }

  showErrorPopup(errorMessage: string) {
    this.popupService.showPopup(errorMessage, "error");
  }
}
