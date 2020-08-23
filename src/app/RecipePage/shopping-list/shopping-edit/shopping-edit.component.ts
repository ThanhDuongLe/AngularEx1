import { Ingredient } from '../../../shared/ingredients.model';
import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static:false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  onSubmit(form: NgForm){
    console.log(form);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) 
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    else  
      this.slService.addIngredient(newIngredient);
    this.editMode = false;  
    form.reset();  
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        })
      }
    );
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
