import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-players-dialog',
  templateUrl: './new-players-dialog.component.html',
  styleUrls: ['./new-players-dialog.component.css']
})
export class NewPlayersDialogComponent implements OnInit {

  newPlayersFormGroup: UntypedFormGroup;
  playerNames: Array<string> = [];
  readonly playerNumbers = [2, 3, 4, 5, 6];
  actualPlayerNum: number[];

  constructor(
    public dialogRef: MatDialogRef<NewPlayersDialogComponent>,
  ) { }

  ngOnInit() {
  }

  private buildform() {
    this.newPlayersFormGroup = new UntypedFormGroup({});
    this.actualPlayerNum.forEach(numOfPlayer => {
      const control = new UntypedFormControl(''
        , Validators.required);
      control.valueChanges.subscribe(value => this.playerNames[numOfPlayer] = value);
      this.newPlayersFormGroup.addControl(numOfPlayer.toString(), control);
    });
  }

  onApprove() {
    if (this.newPlayersFormGroup.valid) {
      this.dialogRef.close(this.playerNames);
    }
  }

  numOfPlayersSelected(numOfPlayers: number) {
    this.actualPlayerNum = [];
    for (let i = 0; i < numOfPlayers; i++) {
      this.actualPlayerNum.push(i);
    }
    this.buildform();
  }

}
