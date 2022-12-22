import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CheckboxType, Constants, RoundType } from '../shared/constants';
import { Player } from '../shared/models/player.model';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {

  formGroup: UntypedFormGroup;
  leaseGroup: UntypedFormGroup;
  RoundType = RoundType;
  CheckboxType = CheckboxType;

  @Input() player: Player;
  @Output() clickHappened = new EventEmitter<Player>();

  constructor() { }

  ngOnInit() {
    this.formGroup = new UntypedFormGroup({
      jovairas: new UntypedFormControl(null, [Validators.required, Validators.min(500)]),
      terheles: new UntypedFormControl(null, [Validators.required, Validators.min(500)])
    });
    this.leaseGroup = new UntypedFormGroup({
      houseRepay: new UntypedFormControl(null, [Validators.required, Validators.min(90000)]),
      carRepay: new UntypedFormControl(null, [Validators.required, Validators.min(130000)])
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
    if (this.player.houseRepaymentLeft >= this.leaseGroup.controls['houseRepay'].value) {
      this.player.houseRepaymentLeft -= this.leaseGroup.controls['houseRepay'].value;
      this.player.actualMoney -= this.leaseGroup.controls['houseRepay'].value;
      this.resetControl(this.leaseGroup, 'houseRepay');
      this.emitPlayer();
    }
  }

  repayCar() {
    if (this.player.carRepaymentLeft >= this.leaseGroup.controls['carRepay'].value) {
      this.player.actualMoney -= this.leaseGroup.controls['carRepay'].value;
      this.player.carRepaymentLeft -= this.leaseGroup.controls['carRepay'].value;
      this.resetControl(this.leaseGroup, 'carRepay');
      this.emitPlayer();
    }

  }

  private resetControl(group: UntypedFormGroup, controlName: string) {
    group.controls[controlName].reset();
    group.controls[controlName].markAsPristine();
    group.controls[controlName].markAsUntouched();
    group.controls[controlName].updateValueAndValidity();
    Object.keys(group.controls).forEach(c => group.controls[c].setErrors(null));
  }

  private emitPlayer() {
    this.clickHappened.emit(this.player);
  }

  onRound(round: RoundType): void {
    this.player.actualMoney += round === RoundType.REGULAR ? Constants.REGULAR_ROUND_MONEY : Constants.START_ROUND_MONEY;
    this.deductMorgageAndCarInterest();
  }

  private deductMorgageAndCarInterest(): void {
    if (this.player.hasMorgage && this.player.houseRepaymentLeft > 0) {
      const decutionAmount = this.player.houseRepaymentLeft >= Constants.REPAY_HOUSE ? Constants.REPAY_HOUSE : this.player.houseRepaymentLeft;
      this.player.actualMoney -= decutionAmount;
      this.player.houseRepaymentLeft -= decutionAmount;
    }

    if (this.player.hasCarLeased && this.player.carRepaymentLeft > 0) {
      const deductionCarAmount = this.player.carRepaymentLeft >= Constants.REPAY_CAR ? Constants.REPAY_CAR : this.player.carRepaymentLeft;
      this.player.actualMoney -= deductionCarAmount;
      this.player.carRepaymentLeft-= deductionCarAmount;
    }
    this.emitPlayer();
  }

  onCheckboxChange(event, insuranceType: CheckboxType): void {
    let deductionAmount = 0;
    switch (insuranceType) {
      case CheckboxType.RETIREMENT:
        if (!this.player.insurances.retirementInsurance) {
          deductionAmount =  Constants.RETIREMENT_INSURANCE;
          this.player.insurances.retirementInsurance  =event.checked;
        }
        break;
      case CheckboxType.HOME:
        if (!this.player.insurances.homeInsurance) {
            deductionAmount = Constants.HOUSE_INSURANCE;
            this.player.insurances.homeInsurance = event.checked;
          }
        break;
      case CheckboxType.CHILD:
        if (!this.player.insurances.childInsurance) {
          deductionAmount = Constants.CHILD_INSURANCE;
          this.player.insurances.childInsurance  =event.checked;

        }
        break;
      case CheckboxType.CASCO:
        if (!this.player.insurances.casco) {
          deductionAmount = Constants.CASCO_PRICE;
          this.player.insurances.casco  =event.checked;

        }
        break;
      case CheckboxType.CAR_LEASE:
        if (!this.player.hasCarLeased) {
          deductionAmount = Constants.CAR_LEASE_START_PRICE;
          this.player.hasCarLeased = event.checked;
        }
        break;
      case CheckboxType.MORGAGE:
        if (!this.player.hasMorgage) {
          deductionAmount = Constants.HOUSE_MORGAGE_START_PRICE;
          this.player.hasMorgage = event.checked;
        }
        break;
    }
    this.player.actualMoney-= deductionAmount;
    this.emitPlayer();
  }

}
