import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  subscription = new Subscription();
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  private loadAddNewForm() {
    this.isEditMode = false;
    this.initForm();
  }

  private loadEditForm(recipe: Recipe) {
    this.isEditMode = true;
    this.recipe = recipe;
    this.initForm();
  }

  ngOnInit(): void {
    const sub = zip(this.route.params, this.route.data).subscribe(
      ([params, data]) => {
        const isNewRecipePage = params['id'] == null;
        if (isNewRecipePage) {
          return this.loadAddNewForm();
        }

        const recipe = data['recipe'];
        if (recipe) {
          return this.loadEditForm(recipe);
        }

        // if we don't have a recipe but we're on the /:id/edit
        // it means we have an invalid recipe id and we should redirect
        this.router.navigate(['/404']);
      }
    );

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let initialValues: Omit<Recipe, 'id'> = {
      name: '',
      imagePath: '',
      description: '',
      ingredients: [],
    };

    if (this.isEditMode) {
      const { name, description, imagePath, ingredients } = this.recipe;
      initialValues = {
        name,
        description,
        imagePath,
        ingredients,
      };
    }

    this.recipeForm = this.fb.group({
      name: [initialValues.name],
      imagePath: [initialValues.imagePath],
      description: [initialValues.description],
    });
  }
}
