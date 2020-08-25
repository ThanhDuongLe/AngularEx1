import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'', redirectTo:'/auth',pathMatch:'full'},
    ]),
    SharedModule,
  ],
  exports:[
    RouterModule
  ]
})
export class AuthModule { }
