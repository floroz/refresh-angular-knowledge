import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor() {}

  getIngredients(recipeId: string) {
    return of([new Ingredient('Garlic', 1), new Ingredient('Flour', 20)]);
  }
}
