import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../models/player.model';
import { ConfirmDialog } from '../constants';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player[]
  ) { }

  ngOnInit() {
  }

  onApprove() {
    this.dialogRef.close(ConfirmDialog.CONFIRMED);
  }

  onCancel() {
    this.dialogRef.close(ConfirmDialog.CANCELLED);
  }

}
