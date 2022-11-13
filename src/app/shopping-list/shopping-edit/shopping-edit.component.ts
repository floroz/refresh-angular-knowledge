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
  selectedId?: number | undefined;
  selectedItem?: Ingredient | undefined;

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

  onUpdate(amount: number) {}

  onAdd() {
    const { name, amount } = this.form.value;

    if (this.isEditing) {
      amount === 0 ? this.delete() : this.update(amount);
    } else {
      this.add(name, amount);
    }

    this.reset();
  }

  private add(name: string, amount: number) {
    this.ingredientService.add(new Ingredient(name, amount));
  }

  private update(amount: number) {
    this.ingredientService.update(this.selectedId!, amount);
  }

  private delete() {
    this.ingredientService.delete(this.selectedId!);
  }

  private reset() {
    this.isEditing = false;
    this.selectedId = undefined;
    this.selectedItem = undefined;
    this.form.resetForm();
  }

  onClear() {
    this.reset();
  }

  onDelete() {
    this.delete();
    this.reset();
  }

  onSubmit(ngForm: NgForm) {}
}
