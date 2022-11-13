import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  onAddIng(ngForm: NgForm) {
    const { name, amount } = ngForm.value;

    this.ingredientService.addIngredient(new Ingredient(name, amount));
  }

  onClear(ngForm: NgForm) {
    ngForm.resetForm();
  }

  onSubmit(ngForm: NgForm) {}
}
