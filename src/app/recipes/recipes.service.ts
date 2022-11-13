import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Ingredient } from '../shared/models/ingredient.model';
import { Recipe } from './recipe.model';

export interface CreateRecipeDto extends Omit<Recipe, 'id' | 'ingredients'> {
  ingredients: Omit<Ingredient, 'id'>[];
}

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipeSubject: Subject<Recipe[]> = new Subject();

  private recipes: Recipe[] = [
    new Recipe(
      'pizza-1',
      'pizza',
      'a good pizza',
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
      [new Ingredient('Garlic', 5), new Ingredient('Bread', 4)]
    ),
    new Recipe(
      'burger-1',
      'burger',
      'a good burger',
      'https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/1:1/w_960,c_limit/basically-burger-1.jpg',
      [new Ingredient('Garlic', 5), new Ingredient('Bread', 4)]
    ),
  ];
  constructor() {}

  createRecipe({
    name,
    description,
    imagePath,
    ingredients: ingredientsDto,
  }: CreateRecipeDto) {
    const ingredients = ingredientsDto.map(
      (ing) => new Ingredient(ing.name, ing.amount)
    );
    const recipe = new Recipe(
      String(Math.random() * 1000),
      name,
      description,
      imagePath,
      ingredients
    );

    this.recipes.push(recipe);
    this.recipeSubject.next(this.recipes);
  }

  updateRecipe(
    id: string,
    {
      name,
      description,
      imagePath,
      ingredients: ingredientsDto,
    }: CreateRecipeDto
  ) {
    const idx = this.recipes.findIndex((rec) => rec.id === id);
    const recipe = this.recipes[idx];

    if (!recipe) {
      throw new Error('no recipe found');
    }

    const updatedRecipe: Recipe = {
      ...recipe,
      name,
      description,
      imagePath,
      ingredients: ingredientsDto.map((ingDto) => {
        const ing = recipe?.ingredients.find((ing) => ing.name === ingDto.name);

        if (ing) {
          // ingredient was already created
          ing.amount = ingDto.amount;
          return ing;
        } else {
          return new Ingredient(ingDto.name, ingDto.amount);
        }
      }),
    };

    this.recipes[idx] = updatedRecipe;
    this.recipeSubject.next(this.recipes);
  }

  getRecepies(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(recipeId: string): Recipe | undefined {
    const rec = this.recipes.find((recipe) => recipe.id === recipeId);

    return rec;
  }

  deleteRecipe(recipeId: string): Recipe {
    const idx = this.recipes.findIndex((rec) => rec.id === recipeId);

    if (idx == -1) {
      throw new Error('recipe not found');
    }

    const recipe = this.recipes[idx];

    this.recipes.splice(idx, 1);

    return recipe;
  }
}
