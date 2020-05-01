import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/models/player.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialog, Constants } from '../shared/constants';
import { NewPlayersDialogComponent } from '../shared/new-players-dialog/new-players-dialog.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  players: Array<Player>;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.readFromLocaleStorage();
  }


  private readFromLocaleStorage() {
    const listOfplayers: Player[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      listOfplayers.push(JSON.parse(window.localStorage.getItem(key)));
    }

    if (listOfplayers.length >= 2) {
      this.openDialog(listOfplayers);
    }
  }

  private setLocalStorage() {
    window.localStorage.clear();
    this.players.sort();
    this.players.forEach((player, index) => {
      window.localStorage.setItem(`player${index}`, JSON.stringify(player));
    });
  }


  private openDialog(players: Array<Player>) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: players
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === ConfirmDialog.CONFIRMED) {
        this.players = players;
      } else {
        const newPlayerDialog = this.dialog.open(NewPlayersDialogComponent);
        newPlayerDialog.afterClosed().subscribe(newPlayers => {
          this.buildNewPlayers(newPlayers);
        });
      }
    });
  }

  private buildNewPlayers(playerNames: string[]) {
    const players: Player[] = [];
    playerNames.forEach(newName => {
      const newPlayer: Player = {
        name: newName,
        actualMoney: Constants.STARTING_MONEY,
        carRepaymentLeft: Constants.CAR,
        houseRepaymentLeft: Constants.HOUSE,
        hasCarLeased: false,
        hasMorgage: false,
        insurances: {
          casco: false,
          childInsurance: false,
          homeInsurance: false,
          retirementInsurance: false
        }
      };
      players.push(newPlayer);
    });
    this.players = players;
  }

  saveToLocaleStorage(player: Player, index: number) {
    this.players[index] = player;
    this.setLocalStorage();
  }
}
