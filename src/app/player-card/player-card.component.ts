import { Component, OnInit, Input } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      jovairas: new FormControl({ value: null }, [Validators.required, Validators.min(500)]),
      terheles: new FormControl({ value: null }, [Validators.required, Validators.min(500)])
    });
    this.leaseGroup = new FormGroup({
      houseRepay: new FormControl({ value: null }, [Validators.required, Validators.min(90000)]),
      carRepay: new FormControl({ value: null }, [Validators.required, Validators.min(130000)])
    });
  }

  add() {
    if (this.formGroup.valid) {
      this.depositMoneyToPlayer(this.player, this.formGroup.controls['jovairas'].value);
    }
  }

  subtract() {
    this.removeMoneyFromPlayer(this.player, this.formGroup.controls['terheles'].value);
  }

  depositMoneyToPlayer(player: Player, amount: number) {
    if (amount && amount !== null) {
      player.actualMoney += amount;
      this.resetControl(this.formGroup, 'jovairas');
    }
  }

  removeMoneyFromPlayer(player: Player, amount: number) {
    player.actualMoney -= amount;
    this.resetControl(this.formGroup, 'terheles');

  }

  addSevenPercent() {
    this.player.actualMoney = Math.ceil((this.player.actualMoney * 1.07) / 500) * 500;
  }

  addFifteenPercent() {
    this.player.actualMoney = Math.ceil((this.player.actualMoney * 1.15) / 500) * 500;
  }

  repayHouse() {
    this.player.houseRepaymentLeft -= this.leaseGroup.controls['houseRepay'].value;
    this.resetControl(this.leaseGroup, 'houseRepay');
  }


  autoRepayHouse() {
    this.player.houseRepaymentLeft -= Constants.REPAY_HOUSE;
  }

  autoRepayCar() {
    this.player.carRepaymentLeft -= Constants.REPAY_CAR;
  }


  resetControl(group: FormGroup, controlName: string) {
    group.controls[controlName].markAsPristine();
    group.controls[controlName].markAsUntouched();
    group.controls[controlName].reset();
  }

}
