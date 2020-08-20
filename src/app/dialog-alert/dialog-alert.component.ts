import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit() {
    console.log("Alert ="+this.data.value)
  }

  deleteCategory(){
    this.eventEmitterService.onDeleteCateClick1(this.data);
  }

}
