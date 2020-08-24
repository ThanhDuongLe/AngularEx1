import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  public error:string = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    console.log('test submit')
    if(!form.valid){
      return;
    }
    console.log(form.value);
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode){
      authObs = this.authService.login(email,password)
    }else{
      authObs = this.authService.signup(email,password)
    }

    authObs.subscribe(
      resData=>{
        console.log(resData);
        this.error = null;
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessage =>{
        this.isLoading = false;
        this.error = errorMessage;
        // console.log('ERROr='+JSON.stringify(error));
        // alert(JSON.stringify(errorMessage.error.error.message));
      }
    );
    form.reset();
  }

  ngOnInit() {
  }

}
