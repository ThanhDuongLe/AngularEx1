
import { NgModule, } from '@angular/core';
import {
    MatButtonModule,
    MatBadgeModule,
    MatSortModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
} from '@angular/material';

@NgModule({
  declarations: [
  ],
  imports: [
    MatButtonModule,
    MatBadgeModule,
    MatSortModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ],
  exports: [
    MatButtonModule,
    MatBadgeModule,
    MatSortModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
  ]
})
export class MaterialImport { }
