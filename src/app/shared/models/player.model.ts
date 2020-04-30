export interface Player {
  name: string;
  actualMoney: number;
  insurances: Insurances;
  hasMorgage: boolean;
  hasCarLeased: boolean;
  houseRepaymentLeft: number;
  carRepaymentLeft: number;
}

export interface Insurances {
  childInsurance: boolean;
  retirementInsurance: boolean;
  homeInsurance: boolean;
  casco: boolean;
}
