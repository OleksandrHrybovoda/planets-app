import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  public openDialog<T, R>(
    component: ComponentType<T>,
    data?: string,
    width?: string
  ): MatDialogRef<T, R> {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.data = data;
    dialogConfig.width = width;
    dialogConfig.disableClose = true;

    return this.dialog.open(component, dialogConfig);
  }

  public openSnackBar(
    message: string,
    duration = 2000,
    horizontalPosition: MatSnackBarHorizontalPosition = 'right',
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    action = ''
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }
}
