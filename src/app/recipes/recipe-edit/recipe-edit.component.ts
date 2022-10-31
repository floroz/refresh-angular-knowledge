import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map, mergeMap, Subscription, zip } from 'rxjs';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  isEditMode: boolean = true;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subscription = zip(this.route.params, this.route.data).subscribe(
      ([params, data]) => {
        const recipe = data['recipe'];

        if (params['id'] == null) {
          this.isEditMode = false;
          return;
        }

        // reset value
        this.isEditMode = true;

        if (recipe) {
          // we have a recipe, which means we are in edit mode
          this.recipe = recipe;
        } else {
          // if we don't have a recipe but we're on the /:id/edit
          // it means we have an invalid recipe id and we should redirect
          this.router.navigate(['/404']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
