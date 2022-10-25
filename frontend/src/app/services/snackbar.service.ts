import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  openSnackbar(message: string, action: string, duration: number) {
    if (action === 'error') {
      this.snackbar.open(message, action, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['black-snackbar']
      });
    } else {
      this.snackbar.open(message, action, {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['green-snackbar']
      });
    }
  }
}
