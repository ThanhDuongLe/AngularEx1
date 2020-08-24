import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Recipe } from '../RecipePage/recipes/recipe.model';
import { RecipeService } from '../RecipePage/recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../RecipePage/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    console.log(recipes);
    console.log('touch')
    this.http
      .put('https://chat-app-a4c04.firebaseio.com/recipes.json', recipes)
      .subscribe(
        res => {
          console.log(res);
        }
      )
  }

  fetchRecipes() {
    console.log('Fetch Data...')
    return this.http
      .get<Recipe[]>('https://chat-app-a4c04.firebaseio.com/recipes.json')
      .pipe(
        map(
          recipes => {
            if (recipes != null)
              return recipes.map(recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
              })
            else
              console.log('Database null')
          }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
    // .subscribe(
    //   res => {
    //     console.log(res)
    //     this.recipeService.setRecipes(res);
    //   }
    // )
  }
}
