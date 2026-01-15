import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './_components/login-page/login-page.component';
import { SignupPageComponent } from './_components/signup-page/signup-page.component';

// Lazy load modules
const userModule = () => import("./user/user.module").then(x => x.UserModule);

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "signup", component: SignupPageComponent },
  { path: "user", loadChildren: userModule },
  { path: "**", redirectTo: "user", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
