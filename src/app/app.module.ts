// Angular modules
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

// Custom modules
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

// JWT modules
import { appInitializer } from './_helpers/app.initializer';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';

// Non-standalone general components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './_general-pages/login-page/login-page.component';
import { SignupPageComponent } from './_general-pages/signup-page/signup-page.component';

// Service(s)
import { AccountService } from './_services/account.service';

// Angular Material components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule,
    AdminModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },    // Run appinitializer on app startup, declare account service as a dependency
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },    // Intercept outgoing requests to add bearer token
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }   // Intercept incoming error messages
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
