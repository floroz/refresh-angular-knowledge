import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes: Recipe[] = [
    new Recipe(
      'pizza-1',
      'pizza',
      'a good pizza',
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg'
    ),
    new Recipe(
      'burger-1',
      'burger',
      'a good burger',
      'https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/1:1/w_960,c_limit/basically-burger-1.jpg'
    ),
  ];
  constructor() {}

  getRecepies(): Observable<Recipe[]> {
    return of(this.recipes);
  }

  getRecipeById(recipeId: string): Observable<Recipe | undefined> {
    const rec = this.recipes.find((recipe) => recipe.id === recipeId);

    return of(rec);
  }
}
