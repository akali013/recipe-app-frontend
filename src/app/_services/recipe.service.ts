import { Injectable } from '@angular/core';
import { Recipe } from 'src/_models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }
}

export let RECIPE_DATA: Recipe[] = [
  {
    id: "1",
    name: "Avocado Toast",
    type: "Breakfast",
    ingredients: ["Bread", "Avocado", "Black Pepper"],
    instructions: ["Cut bread", "Spread avocado", "Drop pepper"],
    source: "el brain"
  },
  {
    id: "2",
    name: "Spaghetti and Meatballs",
    type: "Lunch",
    ingredients: ["Spaghetti", "Meatballs", "Tomato sauce"],
    instructions: ["Boil spaghetti", "Cook meatballs", "Add sauce"],
    source: "el brain"
  },
  {
    id: "3",
    name: "Omelette",
    type: "Breakfast",
    ingredients: ["Eggs", "Cheese"],
    instructions: ["Cook egg", "Add cheese", "Flip egg inward"],
    source: "el brain"
  },
] 