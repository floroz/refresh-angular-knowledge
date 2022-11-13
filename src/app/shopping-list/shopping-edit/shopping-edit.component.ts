import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { IngredientService } from 'src/app/shared/services/ingredient.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) form: NgForm;
  subscription: Subscription = new Subscription();
  isEditing = false;
  selectedId: number;
  selectedItem: Ingredient;

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    const sub = this.ingredientService.startedEditing.subscribe((id) => {
      this.isEditing = true;
      this.selectedId = id;
      this.selectedItem = this.ingredientService.findById(id);
      this.form.setValue({
        name: this.selectedItem.name,
        amount: this.selectedItem.amount,
      });
    });

    this.subscription.add(sub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddIng(ngForm: NgForm) {
    const { name, amount } = ngForm.value;

    if (this.isEditing) {
      // update
      this.ingredientService.update(this.selectedId, amount);
    } else {
      // add
      this.ingredientService.add(new Ingredient(name, amount));
    }
  }

  onClear(ngForm: NgForm) {
    ngForm.resetForm();
  }

  onDelete() {
    this.ingredientService.delete(this.selectedId);
  }

  onSubmit(ngForm: NgForm) {}
}
