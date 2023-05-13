import { ComponentType } from '@angular/cdk/portal';
import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  open(component: ComponentType<unknown>, info: MatDialogConfig<any> | undefined): void {
    this.dialog.open(component, info);
  }
}
