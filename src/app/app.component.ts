import { Component } from '@angular/core';
import { Player } from './shared/models/player.model';
import { Constants } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gazdalkodj-calculator';
  anya: Player = {
    actualMoney: 3250000,
    name: 'Anya',
    hasCarLeased: true,
    hasMorgage: false,
    insurances: {
      casco: false,
      childInsurance: false,
      homeInsurance: false,
      retirementInsurance: false
    },
    houseRepaymentLeft: Constants.HOUSE,
    carRepaymentLeft: Constants.CAR
  };
}
