import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { map, mergeMap, Subscription, zip } from 'rxjs';
import { Recipe } from '../recipe.model';
import { CreateRecipeDto, RecipesService } from '../recipes.service';

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
    private recipeService: RecipesService
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

  onAddNewIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(''),
        amount: new FormControl(0),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  get formIngredients() {
    const controls = (this.recipeForm.controls['ingredients'] as FormArray)
      .controls;
    return controls;
  }

  private initForm() {
    let initialValues = {
      name: '',
      imagePath: '',
      description: '',
      ingredients: new FormArray([] as any[]),
    };

    if (this.isEditMode) {
      const { name, description, imagePath, ingredients } = this.recipe;

      const formArray = [];

      for (let ing of ingredients) {
        const group = new FormGroup({
          name: new FormControl(ing.name),
          amount: new FormControl(ing.amount),
        });

        formArray.push(group);
      }

      initialValues = {
        name,
        description,
        imagePath,
        ingredients: new FormArray(formArray),
      };
    } else {
      initialValues.ingredients = new FormArray([
        new FormGroup({
          name: new FormControl(''),
          amount: new FormControl(0),
        }),
      ]);
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(initialValues.name, [Validators.required]),
      imagePath: new FormControl(initialValues.imagePath, [
        Validators.required,
      ]),
      description: new FormControl(initialValues.description, [
        Validators.required,
        Validators.minLength(4),
      ]),
      ingredients: initialValues.ingredients,
    });
  }

  private createRecipe(dto: CreateRecipeDto) {
    this.recipeService.createRecipe(dto);
  }

  private updateRecipe(dto: CreateRecipeDto) {
    this.recipeService.updateRecipe(this.recipe.id, dto);
  }

  onSubmit() {
    this.recipeForm.value;

    if (this.isEditMode) {
      this.updateRecipe({
        ...this.recipeForm.value,
      });
    } else {
      this.createRecipe({
        ...this.recipeForm.value,
      });
    }
  }
}
