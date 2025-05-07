import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../components/edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { DialogData, EditDialogData } from '../models/dialog.models';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  openEditDialog(data: EditDialogData) {
    return this.dialog.open(EditDialogComponent, {
      width: '400px',
      data
    });
  }

  openConfirmDialog(data: DialogData) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data
    });
  }
}