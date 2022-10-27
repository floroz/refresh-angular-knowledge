import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404Component } from './not-found404/not-found404.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
  },
  {
    path: 'recipes',
    pathMatch: 'full',
    component: RecipesComponent,
  },
  {
    path: 'recipes/:id',
    component: RecipeDetailComponent,
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
