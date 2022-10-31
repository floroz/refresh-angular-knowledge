import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404Component } from './not-found404/not-found404.component';
import { NoRecipeSelectedComponent } from './recipes/no-recipe-selected/no-recipe-selected.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeResolverService } from './shared/services/recipe-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: NoRecipeSelectedComponent,
      },
      {
        path: 'new',
        pathMatch: 'full',
        component: RecipeEditComponent,
        resolve: {
          recipe: RecipeResolverService,
        },
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: {
          recipe: RecipeResolverService,
        },
      },

      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: {
          recipe: RecipeResolverService,
        },
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes',
  },
  {
    path: '404',
    pathMatch: 'full',
    component: NotFound404Component,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
