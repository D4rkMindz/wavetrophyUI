import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {extract} from './i18n.service';

@Injectable()
export class SnackbarService {

  constructor(private snackbar: MatSnackBar) {
  }

  public info(message: string) {
    this.snackbar.open(message, extract('OK'), {
      duration: 1000 * 3,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
