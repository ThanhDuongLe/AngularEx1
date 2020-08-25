import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  public error: string = null;
  private closeSub: Subscription;

  @ViewChild(PlaceholderDirective,{static:false}) alertHost: PlaceholderDirective

  constructor(private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    console.log('test submit')
    if (!form.valid) {
      return;
    }
    console.log(form.value);
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.error = null;
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
        this.error = errorMessage;
        // console.log('ERROr='+JSON.stringify(error));
        // alert(JSON.stringify(errorMessage.error.error.message));
      }
    );
    form.reset();
  }
  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear(); //clear everything render before

      const componentRef=hostViewContainerRef.createComponent(alertCmpFactory);
      componentRef.instance.message = message;
      this.closeSub = componentRef.instance.close.subscribe(
        ()=>{
          this.closeSub.unsubscribe();
          hostViewContainerRef.clear();
        }
      )
    }

  ngOnInit() {
    // this.authService.autoLogin();
  }
  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

}
