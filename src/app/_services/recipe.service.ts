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

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<Recipe>("getRecipeById", this.errorRecipe))
    );
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    const id = this.accountService.accountValue?.id;
    const createRequestObj = {
      "Name": recipe.name,
      "Type": recipe.type,
      "Ingredients": recipe.ingredients,
      "Instructions": recipe.instructions,
      "ImageUrl": recipe.imageUrl,
      "UserId": id
    };

    return this.http.post<Recipe>(this.apiUrl, createRequestObj, { headers: this.headers }).pipe(
      catchError(this.handleError("createRecipe", this.errorRecipe))
    );
  }

  updateRecipe(recipe: Recipe): Observable<any> {
    const recipeDTO = {
      name: recipe.name,
      type: recipe.type,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      source: recipe.source,
      imageUrl: recipe.imageUrl
    };

    return this.http.put(`${this.apiUrl}/${recipe.id}`, recipeDTO, {headers: this.headers, withCredentials: true}).pipe(
      catchError(this.handleError("updateRecipe"))
    );
  }

  deleteRecipe(recipe: Recipe): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${recipe.id}`, { headers: this.headers }).pipe(
      catchError(this.handleError("deleteRecipe"))
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