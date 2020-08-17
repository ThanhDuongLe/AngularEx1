
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {
  public inputYear: string;
  public months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'Junly',
                              'August', 'Septemper', 'October', 'November', 'December'];
  public monthDetail: string[] = ['Projected', 'Actual', 'Variance'];
  public dataTitle: string[] = ['Income Categories', 'Total Incomes', 'Expense Categories',
                                  'Total Expense', 'Opening calance', 'Close Balance'];
  public items = Array.from({length: 14}, (v, k) => k + 1);
  constructor() { }

  ngOnInit() {
  }

}
