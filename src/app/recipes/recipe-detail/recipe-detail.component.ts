import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { filter, map, Subscription, switchMap } from 'rxjs';
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
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params
      .pipe(
        map((params): string | undefined => params['id']),
        switchMap((id) => this.recipesService.getRecipeById(id ?? ''))
      )
      .subscribe((recipe) => {
        console.log(recipe);
        if (!recipe) {
          this.router.navigateByUrl('/404');
        } else {
          this.recipe = recipe;
        }
      });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  ngDoCheck() {}
}
