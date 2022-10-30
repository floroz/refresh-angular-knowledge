import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe.model';
import { RecipesService } from 'src/app/recipes/recipes.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Recipe | undefined> {
  constructor(private recipeService: RecipesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe | undefined> {
    const recipeId = route.params['id'];

    return this.recipeService.getRecipeById(recipeId);
  }
}
