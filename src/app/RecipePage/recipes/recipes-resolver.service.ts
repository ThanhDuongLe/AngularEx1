import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService) { }

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot,
    ){
      const recipes = this.recipesService.getRecipes();
      // To avoid fetching data after edit saved.
      // Only fetch when not edit anything.
      if(recipes.length === 0)
        return this.dataStorageService.fetchRecipes();
      else
        return recipes;  
  }
}
