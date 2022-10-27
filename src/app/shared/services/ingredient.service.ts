import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  ingredients: Ingredient[] = [
    new Ingredient('Garlic', 1),
    new Ingredient('Flour', 20),
  ];
  constructor() {}

  getIngredients(recipeId: string) {
    return of(this.ingredients);
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
  }
}
