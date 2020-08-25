import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { AuthComponent } from '../auth/auth.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'recipes',
        component: RecipesComponent,
        children: [
          {
            path: '',
            component: RecipeStartComponent,
            resolve: [RecipesResolverService],    //here to call fetchData when route is actived
            canActivate: [AuthGuard],
          },
          { path: 'new', component: RecipeEditComponent },
          { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
          { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
        ]
      },
      {path:'auth', component:AuthComponent},
      {path:'shopping-list', component:ShoppingListComponent},
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }

