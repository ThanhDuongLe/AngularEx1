import { Injectable } from '@angular/core';
import { RegisterInfo } from './user-form/register.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  registerChanged = new Subject<RegisterInfo[]>();

  constructor() { }
  public registerData : RegisterInfo[] = [];

  addRegisterInfo(newInfo: RegisterInfo){
    this.registerData.push(newInfo);
    this.registerChanged.next(this.registerData.slice());
  }
}
