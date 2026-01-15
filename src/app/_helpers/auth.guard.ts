import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const account = this.accountService.accountValue;

    if (account) {
      // Check if the route is role-restricted
      if (route.data["roles"] && !route.data["roles"].includes(account.role)) {
        // Redirect to the recipes table if the role is unauthorized
        this.router.navigate(["/recipes"]);
        return false;
      }

      return true;
    }

    // User isn't logged in, so navigate to the login page and store the desired route
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

  constructor(private router: Router, private accountService: AccountService) { }

}
