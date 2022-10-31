import { Injectable } from '@angular/core';
import { map, of, Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredients: Map<string, Ingredient> = new Map();

  ingredientSubject: Subject<Ingredient[]> = new Subject();
  constructor() {}

  getIngredients(): Ingredient[] {
    return [...this.ingredients.values()];
  }

  addIngredient(ingredient: Ingredient) {
    const ing = this.ingredients.get(ingredient.name);

    if (ing) {
      // if an ingredient is already in the list
      ing.amount += ingredient.amount;
    } else {
      this.ingredients.set(ingredient.name, ingredient);
    }

    this.ingredientSubject.next([...this.ingredients.values()]);
  }

  clearIngredients() {
    this.ingredients = new Map();
  }
}
