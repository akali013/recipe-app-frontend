import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './_general-pages/login-page/login-page.component';
import { SignupPageComponent } from './_general-pages/signup-page/signup-page.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';

// Lazy load custom modules for efficiency
const userModule = () => import("./user/user.module").then(m => m.UserModule);
const adminModule = () => import('./admin/admin.module').then(m => m.AdminModule);

// Map URLs to app components
// Ex: /login => Login page
const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "signup", component: SignupPageComponent },
  // Use /user to enter user module components; requires a logged in user account
  { path: "user", loadChildren: userModule, canActivate: [AuthGuard], data: { roles: [Role.User] } },
  // Use /admin to enter admin module components; requires a logged in admin account
  { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: "**", redirectTo: "user", pathMatch: "full" }   // Redirect any other urls to the user module
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
