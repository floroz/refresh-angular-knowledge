import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  ingredients: Map<string, Ingredient> = new Map();
  constructor() {}

  getIngredients() {
    return of(Array.from(this.ingredients.values()));
  }

  addIngredient(ingredient: Ingredient) {
    const ing = this.ingredients.get(ingredient.name);

    if (ing) {
      // if an ingredient is already in the list
      ing.amount += ingredient.amount;
    } else {
      this.ingredients.set(ingredient.name, ingredient);
    }
  }

  clearIngredients() {
    this.ingredients = new Map();
  }
}
