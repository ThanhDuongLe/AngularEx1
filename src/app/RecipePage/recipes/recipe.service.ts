import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    public recipes: Recipe[] = [
        new Recipe(
          'A Recipe', 
          'This is a test',
          'https://www.acouplecooks.com/wp-content/uploads/2019/11/Recipes-Header-1-800x400.jpg',
          [
            new Ingredient('Meat',1),
            new Ingredient('Frech Fries',20)
          ]),
        new Recipe(
          'Another Recipe', 
          'This is a test',
          'https://www.acouplecooks.com/wp-content/uploads/2019/11/Recipes-Header-1-800x400.jpg',
          [
            new Ingredient('Buns',2),
            new Ingredient('Meat',1)
          ])
      ];

      constructor(private slService: ShoppingListService){}

      getRecipes()  {
          return this.recipes.slice();
      }
      getRecipe(index: number){
        return this.recipes[index];
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}