import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    if (action === 'error') {
      this.snackbar.open(message, '', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['black-snackbar']

      })
    }
    else {
      this.snackbar.open(message, '', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['green-snackbar']

      })
    }
  }
}