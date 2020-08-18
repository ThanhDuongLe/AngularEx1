import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-setup-financies',
  templateUrl: './setup-financies.component.html',
  styleUrls: ['./setup-financies.component.css']
})
export class SetupFinanciesComponent implements OnInit {

  constructor(public dialog: MatDialog){}
  openDialog(){
    let dialogRef = this.dialog.open(DialogAlertComponent);
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog result: ${result}`);
    });
  }

  public inputYear: string;
  public months: string[] = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'Junly',
                              'August', 'Septemper', 'October', 'November', 'December'];
  public monthDetail: string[] = ['Projected', 'Actual', 'Variance'];
  public dataTitle: string[] = ['Income Categories', 'Total Incomes', 'Expense Categories',
                                  'Total Expenses', 'Opening Balance', 'Close Balance', ''];
  public items = Array.from({length: 14}, (v, k) => k + 1);
  
  public category1: string=null;  //add if enter save name for new category 
  public category2: string=null;  //add if enter save name for new category
  public newCategory : string[]=[]; // new array for categories row
  public newCategory2 : string[]=[]; // new array for categories row
  addNewCategory1(value:string){
    if(value!=null){
      this.newCategory.push(value);
      console.log(this.newCategory.toString());
      value = null;
    }
  }
  public deleteCategory1(value:number){
    this.newCategory.splice(value,1);
    console.log(this.newCategory.toString());
  }
  addNewCategory2(value:string){
    if(value!=null){
      this.newCategory2.push(value);
      console.log(this.newCategory2.toString());
      value = null;
    }
  }
  deleteCategory2(value:number){
    this.newCategory2.splice(value,1);
    console.log(this.newCategory2.toString());
  }

  ngOnInit() {
  }

}
