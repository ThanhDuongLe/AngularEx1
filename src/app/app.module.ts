import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { MaterialImport } from './Material/Material.module';
import { SetupFinanciesComponent } from './setup-financies/setup-financies.component';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { EventEmitterService } from './event-emitter.service';
import { TouchRemoveItemDirective } from './touch-remove-item.directive';
import { HeaderComponent } from './RecipePage/header/header.component';
import { RecipesComponent } from './RecipePage/recipes/recipes.component';
import { ShoppingListComponent } from './RecipePage/shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './RecipePage/recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './RecipePage/recipes/recipe-list/recipe-list.component';
import { RecipeService } from './RecipePage/recipes/recipe.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeItemComponent } from './RecipePage/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingEditComponent } from './RecipePage/shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService } from './RecipePage/shopping-list/shopping-list.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './RecipePage/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './RecipePage/recipes/recipe-edit/recipe-edit.component';

// const routes: Routes = [
//   {path:'', component:HomeComponent},
//   {path: 'not-found', component: PageNotFoundComponent},
//   { path: '**', redirectTo:'/not-found' },
// ];


@NgModule({
  declarations: [
    AppComponent,
      SetupFinanciesComponent,
      DialogAlertComponent,
      TouchRemoveItemDirective,
      HeaderComponent,
      RecipesComponent,
      ShoppingListComponent,
      RecipeDetailComponent,
      RecipeListComponent,
      DropdownDirective,
      RecipeItemComponent,
      ShoppingEditComponent,
      PageNotFoundComponent,
      HomeComponent,
      RecipeStartComponent,
      RecipeEditComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialImport,
    AppRoutingModule,
    // RouterModule.forRoot(routes)
  ],
  providers: [
    MaterialImport,
    EventEmitterService,
    RecipeService,
    ShoppingListService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogAlertComponent] //should add this entry to show dialog
})
export class AppModule { }
