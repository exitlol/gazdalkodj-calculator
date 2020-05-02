import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../shared/models/player.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {

  formGroup: FormGroup;
  leaseGroup: FormGroup;

  @Input() player: Player;
  @Output() clickHappened = new EventEmitter<Player>();

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      jovairas: new FormControl(null, [Validators.required, Validators.min(500)]),
      terheles: new FormControl(null, [Validators.required, Validators.min(500)])
    });
    this.leaseGroup = new FormGroup({
      houseRepay: new FormControl(null, [Validators.required, Validators.min(90000)]),
      carRepay: new FormControl(null, [Validators.required, Validators.min(130000)])
    });
  }

  add() {
    if (this.formGroup.controls['jovairas'].valid) {
      this.depositMoneyToPlayer(this.player, this.formGroup.controls['jovairas'].value);
      this.emitPlayer();
    }
  }

  subtract() {
    this.removeMoneyFromPlayer(this.player, this.formGroup.controls['terheles'].value);
    this.emitPlayer();

  }

  depositMoneyToPlayer(player: Player, amount: number) {
    if (amount && amount !== null) {
      player.actualMoney += amount;
      this.resetControl(this.formGroup, 'jovairas');
      this.emitPlayer();

    }
  }

  removeMoneyFromPlayer(player: Player, amount: number) {
    player.actualMoney -= amount;
    this.resetControl(this.formGroup, 'terheles');
    this.emitPlayer();


  }

  addSevenPercent() {
    this.player.actualMoney = Math.ceil((this.player.actualMoney * 1.07) / 500) * 500;
    this.emitPlayer();

  }

  addFifteenPercent() {
    this.player.actualMoney = Math.ceil((this.player.actualMoney * 1.15) / 500) * 500;
    this.emitPlayer();

  }

  repayHouse() {
    this.player.houseRepaymentLeft -= this.leaseGroup.controls['houseRepay'].value;
    this.resetControl(this.leaseGroup, 'houseRepay');
    this.emitPlayer();

  }

  repayCar() {
    this.player.carRepaymentLeft -= this.leaseGroup.controls['carRepay'].value;
    this.resetControl(this.leaseGroup, 'carRepay');
    this.emitPlayer();

  }


  autoRepayHouse() {
    if (this.player.houseRepaymentLeft > Constants.REPAY_HOUSE) {
      this.player.actualMoney -= Constants.REPAY_HOUSE;
      this.player.houseRepaymentLeft -= Constants.REPAY_HOUSE;
      this.resetControl(this.leaseGroup, 'houseRepay');
      this.emitPlayer();
    }
  }

  autoRepayCar() {
    if (this.player.carRepaymentLeft > Constants.REPAY_CAR) {
      this.player.actualMoney -= Constants.REPAY_CAR;
      this.player.carRepaymentLeft -= Constants.REPAY_CAR;
      this.resetControl(this.leaseGroup, 'carRepay');
      this.emitPlayer();
    }
  }


  private resetControl(group: FormGroup, controlName: string) {
    group.controls[controlName].reset();
    group.controls[controlName].markAsPristine();
    group.controls[controlName].markAsUntouched();
    group.controls[controlName].updateValueAndValidity();
    Object.keys(group.controls).forEach(c => group.controls[c].setErrors(null));
  }

  private emitPlayer() {
    this.clickHappened.emit(this.player);
  }

}
