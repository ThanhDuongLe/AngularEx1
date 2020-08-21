import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipesComponent } from './RecipePage/recipes/recipes.component';
import { ShoppingListComponent } from './RecipePage/shopping-list/shopping-list.component';
import { RecipeStartComponent } from './RecipePage/recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './RecipePage/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './RecipePage/recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    {path:'', component:HomeComponent, children:[
        {path:'recipes', component:RecipesComponent, children:[
            {path:'', component:RecipeStartComponent},
            {path:'new', component:RecipeEditComponent},
            {path:':id', component:RecipeDetailComponent},
            {path:':id/edit', component:RecipeEditComponent},
        ]},
        {path:'shopping-list', component:ShoppingListComponent},
    ]},
    {path: 'not-found', component: PageNotFoundComponent},
    { path: '**', redirectTo:'/not-found' },
];

@NgModule({
    declarations: [],
    imports: [ 
        RouterModule.forRoot(appRoutes,{useHash: true})
     ],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule {}