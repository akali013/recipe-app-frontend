import { catchError, of } from "rxjs";
import { AccountService } from "../_services/account.service";


// Automatically log the user back into the app if they did not log out before when opening the app again
export function appInitializer(accountService: AccountService) {
  return () => accountService.refreshToken().pipe(
    catchError(() => of())  // Resolve the function if there is an error anyway to run the app
  );
}