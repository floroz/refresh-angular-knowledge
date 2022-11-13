import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import { filter, map, Subscription, switchMap } from 'rxjs';
import { IngredientService } from 'src/app/shared/services/ingredient.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  routeSub: Subscription;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ingredientsService: IngredientService,
    private recipeServices: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      const recipe = data['recipe'];

      if (!recipe) {
        this.router.navigate(['/404']);
      } else {
        this.recipe = recipe;
      }
    });
  }

  ngOnDestroy() {}

  onShoppingListAdd(event: Event) {
    event.preventDefault();

    // add ings to shopping service
    this.recipe.ingredients.forEach((ing) => this.ingredientsService.add(ing));

    // navigate to shopping page
    this.router.navigateByUrl('/shopping-list');
  }

  onDeleteRecipe(id: string) {
    this.recipeServices.deleteRecipe(id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
