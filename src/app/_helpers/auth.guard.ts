import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { Role } from '../_models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const account = this.accountService.accountValue;

    // Check if the user is logged in
    if (account) {
      // Check if the route is role-restricted
      if (route.data["roles"] && !route.data["roles"].includes(account.role)) {
        // Redirect to the corresponding recipes table if the role is unauthorized
        account.role === Role.Admin ? this.router.navigate(["admin/recipes"]) : this.router.navigate(["user/recipes"]);
        return false;
      }

      return true;    // Send the user to their desired route
    }

    // User isn't logged in, so navigate to the login page and store the desired route
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

  constructor(private router: Router, private accountService: AccountService) { }

}
