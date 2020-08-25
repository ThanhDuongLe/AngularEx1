import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from '../RecipePage/shopping-list/shopping-list.component';
import { RecipesComponent } from '../RecipePage/recipes/recipes.component';
import { AuthComponent } from '../RecipePage/auth/auth.component';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeStartComponent } from '../RecipePage/recipes/recipe-start/recipe-start.component';
import { AuthGuard } from '../RecipePage/auth/auth.guard';
import { RecipesResolverService } from '../RecipePage/recipes/recipes-resolver.service';
import { RecipeEditComponent } from '../RecipePage/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from '../RecipePage/recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {path:'', component:HomeComponent, children:[
    // {path:'',redirectTo:'/auth',pathMatch:'full'},
    // {
    //   path: 'recipes',
    //   component: RecipesComponent, 
    //   // loadChildren: ()=>import('../RecipePage/recipes/recipes.component'),
    //   children: [
    //     {
    //       path: '',
    //       component: RecipeStartComponent,
    //       resolve: [RecipesResolverService],    //here to call fetchData when route is actived
    //       canActivate: [AuthGuard],
    //     },
    //     { path: 'new', component: RecipeEditComponent },
    //     { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    //     { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
    //   ]
    // },
    {path:'recipes', loadChildren: ()=>import('../RecipePage/recipes/recipes.module').then(m=>m.RecipesModule)},
    // {path:'shopping-list', component:ShoppingListComponent},
    // {path:'auth', component:AuthComponent},
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[
    RouterModule
  ]
})
export class HomeRoutingModule { }
