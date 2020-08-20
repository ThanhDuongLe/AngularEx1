import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeDeleteCategory1 = new EventEmitter();
  subsVar: Subscription;
  constructor() { }

  onDeleteCateClick1(value:any){
    this.invokeDeleteCategory1.emit(value);
  }
}
