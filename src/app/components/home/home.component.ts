import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { ShipActions } from '@app/store/actions/ship.actions';
import {
  selectGunActive,
  selectGunCalculation,
  selectGunCalculationIsActive,
  selectGunIsActive,
} from '@app/store/selectors/gun.selector';
import {
  selectShipActive,
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
      .select(selectShipIsActive, selectGunIsActive)
      .subscribe((active) => {
        if (active) {
          this.store.dispatch(ShipActions.ProcessActive());
        }
      });
    this.store.select(selectShipIsActive).subscribe((active) => {
      this.isShipActive = active;
    });
    this.store.select(selectGunIsActive).subscribe((active) => {
      this.isGunActive = active;
      if (active) {
        this.store.dispatch(GunActions.ProcessActive());
      }
    });
    this.store
      .select(selectGunCalculationIsActive)
      .subscribe((isActive) => (this.isGunCalculationActive = isActive));
    this.store
      .select(selectShipCalculationIsActive)
      .subscribe((isActive) => (this.isShipCalculationActive = isActive));
  }
}
