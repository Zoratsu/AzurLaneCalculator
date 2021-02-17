import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import {
  selectGunCalculationIsActive,
  selectGunIsActive,
} from '@app/store/selectors/gun.selector';
import {
  selectShipCalculation,
  selectShipCalculationIsActive,
  selectShipIsActive,
} from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isGunActive: boolean = false;
  public isGunCalculationActive: boolean = false;
  public isShipActive: boolean = false;
  public isShipCalculationActive: boolean = false;

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.store
      .select(selectGunIsActive)
      .subscribe((isActive) => (this.isGunActive = isActive));
    this.store
      .select(selectGunCalculationIsActive)
      .subscribe((isActive) => (this.isGunCalculationActive = isActive));
    this.store
      .select(selectShipIsActive)
      .subscribe((isActive) => (this.isShipActive = isActive));
    this.store
      .select(selectShipCalculationIsActive)
      .subscribe((isActive) => (this.isShipCalculationActive = isActive));
  }
}
