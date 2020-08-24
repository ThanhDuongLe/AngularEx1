import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipesComponent } from './RecipePage/recipes/recipes.component';
import { ShoppingListComponent } from './RecipePage/shopping-list/shopping-list.component';
import { RecipeStartComponent } from './RecipePage/recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './RecipePage/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './RecipePage/recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './RecipePage/recipes/recipes-resolver.service';
import { AuthComponent } from './RecipePage/auth/auth.component';

const appRoutes: Routes = [
    {path:'', component:HomeComponent, children:[
        {path:'', redirectTo:'/auth', pathMatch:'full'},
        {path:'recipes', component:RecipesComponent, children:[
            {path:'',
             component:RecipeStartComponent,  
             resolve:[RecipesResolverService]},     //here to call fetchData when route is actived
            {path:'new', component:RecipeEditComponent},
            {path:':id', component:RecipeDetailComponent, resolve:[RecipesResolverService]},
            {path:':id/edit', component:RecipeEditComponent, resolve:[RecipesResolverService]},
        ]},
        {path:'shopping-list', component:ShoppingListComponent},
        {path:'auth', component:AuthComponent},
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