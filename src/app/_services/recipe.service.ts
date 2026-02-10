import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Recipe } from 'src/app/_models/recipe';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  apiUrl = environment.apiUrl + "/recipes";
  headers = new HttpHeaders({
    "Content-Type": "application/json"
  });
  // Default recipe if an error is returned by the API
  errorRecipe: Recipe = {
    id: "0",
    name: "N/A",
    type: "",
    source: "",
    imageUrl: "",
    instructions: [],
    ingredients: []
  };

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl).pipe(
      catchError(this.handleError<Recipe[]>("getRecipes", []))
    );
  }

  // Retrieves data of the Recipe type from the backend via the recipe's id
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`).pipe(
      // User-submitted recipe images are stored in the backend at http://localhost:5133/recipeImages/{fileName}
      // Leave MealsDB image URLs alone
      tap(recipe => {
        if (!recipe.imageUrl.includes("http")) {
          recipe.imageUrl = `${environment.apiUrl}/recipeImages/${recipe.imageUrl}`.trim();
        }
      }),
      catchError(this.handleError<Recipe>("getRecipeById", this.errorRecipe))
    );
  }

  // Send the new recipe info as FormData with the user's id so the recipe can be linked to them
  createRecipe(recipeInfo: FormData): Observable<Recipe> {
    const id = this.accountService.accountValue?.id!;
    recipeInfo.set("userId", id);

    // Do not set the Content-Type header for the FormData recipeInfo parameter
    return this.http.post<Recipe>(this.apiUrl, recipeInfo).pipe(
      catchError(this.handleError("createRecipe", this.errorRecipe))
    );
  }

  // Send the updated recipe information as FormData so the image data can be sent as well
  updateRecipe(id: string, recipeInfo: FormData): Observable<any> {
    // Do not set the Content-Type header for the FormData recipeInfo parameter
    return this.http.put(`${this.apiUrl}/${id}`, recipeInfo).pipe(
      catchError(this.handleError("updateRecipe"))
    );
  }

  deleteRecipe(recipe: Recipe): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${recipe.id}`, { headers: this.headers }).pipe(
      catchError(this.handleError("deleteRecipe"))
    );
  }

  // Get all recipes made by the user with the parameter id
  getUserRecipes(id: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/users/${id}`, { headers: this.headers, withCredentials: true }).pipe(
      catchError(this.handleError("getUserRecipes", [this.errorRecipe]))
    );
  }

  // Source: https://v14.angular.io/tutorial/toh-pt6
  // Handles errors from any calls made to the API
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning a given result.
      return of(result as T);
    };
  }
}
