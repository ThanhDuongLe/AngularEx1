import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterInfo } from './register.model';
import { DataServiceService } from '../data-service.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  registerGroup: FormGroup;
  public registerInfo: RegisterInfo;
  public showUserRegisted: RegisterInfo[];
  public error = null;
  public idDelete: string = '';
  
  constructor(
    private registerService: DataServiceService,
    private http: HttpClient) { }

  ngOnInit() {
    let registerName = '';
    let registerEmail = '';
    let registerPassword = '';

    this.registerGroup = new FormGroup({
      'name': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl()
    })
    this.registerService.registerChanged
    .subscribe(
      (updateUserRegisted: RegisterInfo[])=>{
        this.showUserRegisted = updateUserRegisted;
      }
    )
  }

  registerOnSubmit(){
    console.log(this.registerGroup);
    
    this.registerInfo = new RegisterInfo(
      this.registerGroup.value.name,
      this.registerGroup.value.email,
      this.registerGroup.value.password
    )
    console.log(this.registerInfo);
    this.registerService.addRegisterInfo(this.registerInfo);
    console.log(this.registerService.registerData);
  }

  onPost(){
    // console.log(this.registerGroup.value);
    this.http.post('https://angularex-78d45.firebaseio.com/AngularEx1.json',this.registerGroup.value)
    .subscribe(
      (result)=>{
        console.log(result);
        this.error = null;
      },
      error=>{
        this.error = error.message;
      }
    )
  }

  onGet(){
    // console.log(this.registerGroup.value);
    this.http.get('https://angularex-78d45.firebaseio.com/AngularEx1.json')
    //use pipe for some operator before get data in subscribe
    .pipe(map(res =>{
      const dataStore=[];
      for(const key in res){
        if(res.hasOwnProperty(key))
          dataStore.push({...res[key], id:key})
      }
      // console.log('dataStore='+dataStore.toString());
      return dataStore;
    }))
    .subscribe(
      (result)=>{
        console.log(result);
        this.error = null;
      },
      error=>{
        this.error = error.message;
      }
    )
  }

  onDelete(id: string){
    let id_delete = 'https://angularex-78d45.firebaseio.com/AngularEx1/-MFTS6X6b1bP6QqDF0CZ.json';
    this.http.delete(id_delete)
    .subscribe(
      (res) => {
        console.log('Dlele status: '+res);
      }
    )
    // console.log(id);
  }

}
