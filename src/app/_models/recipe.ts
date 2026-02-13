export interface Recipe {
  id: string;
  name: string;
  type: string;
  ingredients: string[];
  instructions: string[];
  source: string;   // Can be either a url from the MealsDB API or a user id
  imageUrl: string;
}