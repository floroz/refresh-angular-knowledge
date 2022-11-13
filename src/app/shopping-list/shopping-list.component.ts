import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { IngredientService } from '../shared/services/ingredient.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    const initialIngredients = this.ingredientService.findAll();

    if (initialIngredients.length) {
      this.ingredients = initialIngredients;
    }

    this.ingredientService.ingredientSubject.subscribe(
      (ings) => (this.ingredients = ings)
    );
  }

  onEdit(id: number) {
    this.ingredientService.startedEditing.next(id);
  }
}
