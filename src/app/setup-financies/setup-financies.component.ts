import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup-financies',
  templateUrl: './setup-financies.component.html',
  styleUrls: ['./setup-financies.component.css']
})
export class SetupFinanciesComponent implements OnInit {

  constructor() { }
  public inputYear: string;
  public months: string[] = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'Junly',
                              'August', 'Septemper', 'October', 'November', 'December'];
  public monthDetail: string[] = ['Projected', 'Actual', 'Variance'];
  public dataTitle: string[] = ['Income Categories', 'Total Incomes', 'Expense Categories',
                                  'Total Expenses', 'Opening Balance', 'Close Balance', ''];
  public items = Array.from({length: 14}, (v, k) => k + 1);
  ngOnInit() {
  }

}
