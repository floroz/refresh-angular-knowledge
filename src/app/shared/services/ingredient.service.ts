import { Injectable } from '@angular/core';
import { map, of, Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  startedEditing = new Subject<number>();
  private ingredients: Map<number, Ingredient> = new Map();

  ingredientSubject: Subject<Ingredient[]> = new Subject();
  constructor() {}

  private toArray() {
    return [...this.ingredients.values()];
  }

  findAll(): Ingredient[] {
    return this.toArray();
  }

  findById(id: number): Ingredient {
    const ing = this.ingredients.get(id);

    if (typeof ing === 'undefined') {
      throw new Error('Ing not found');
    }

    return ing;
  }

  update(id: number, amount: number) {
    const ing = this.ingredients.get(id);

    if (!ing) throw new Error('not found');

    if (amount <= 0) {
      // delete
      this.delete(id);
    } else {
      // update
      ing.amount = amount;
      this.ingredients.set(id, ing);
    }
  }

  add(ingredient: Ingredient) {
    const ing = this.ingredients.get(ingredient.id);

    if (ing) {
      // if an ingredient is already in the list
      ing.amount += ingredient.amount;
    } else {
      this.ingredients.set(ingredient.id, ingredient);
    }

    this.ingredientSubject.next([...this.ingredients.values()]);
  }

  reset() {
    this.ingredients = new Map();
  }

  delete(id: number) {
    this.ingredients.delete(id);

    this.ingredientSubject.next(this.toArray());
  }
}
