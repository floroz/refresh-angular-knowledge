import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { IngredientService } from 'src/app/shared/services/ingredient.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountInput: ElementRef<HTMLInputElement>;

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {}

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const name = this.nameInput.nativeElement.value;
    const amount = +this.amountInput.nativeElement.value;

    this.ingredientService.addIngredient(new Ingredient(name, amount));
  }
}
