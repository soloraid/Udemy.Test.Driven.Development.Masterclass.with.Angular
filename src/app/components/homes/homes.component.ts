import { Component, OnInit } from '@angular/core';

import {Observable, of} from 'rxjs'
import {DataService} from '../services/data.service';
import {DialogService} from '../services/dialog.service';
import {BookComponent} from '../book/book.component';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.less']
})
export class HomesComponent implements OnInit {
  homes$: Observable<any[]> | undefined;
  constructor(private dataService: DataService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.homes$ = this.dataService.getHomes$();
  }

  openDialog(home: any): void {
    this.dialogService.open(BookComponent, {
      width: '500px',
      data: {home},
    });
  }
}
