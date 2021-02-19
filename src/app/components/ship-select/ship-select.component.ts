import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Nation } from '@app/models/nation';
import { IShip, IShipStat } from '@app/models/ship';
import { AppState } from '@app/store';
import { ShipActions } from '@app/store/actions/ship.actions';
import { selectNavigationShipClass } from '@app/store/selectors/navigation.selector';
import {
  selectShipActive,
  selectShipArray,
} from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-select',
  templateUrl: './ship-select.component.html',
  styleUrls: ['./ship-select.component.scss'],
})
export class ShipSelectComponent implements OnInit {
  public shipList: IShip[] = [];
  public initialShip: any = null;
  public statList: IShipStat[] = [];
  public initialStat: any = null;
  public nationList: Nation[] = [];
  public initialNation: any = 0;

  private ngUnsubscribe = new Subject();

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
    this.loadArray();
    this.nationList = Object.values(Nation);
  }

  public onChangeNationality($event: MatSelectChange): void {
    this.clear(false);
    this.initialNation = $event.value;
    this.store.dispatch(
      ShipActions.LoadArray({ nation: this.nationList[$event.value] })
    );
  }

  public onChangeShip($event: MatSelectChange): void {
    this.clear(false);
    this.initialShip = $event.value;
    this.store.dispatch(
      ShipActions.SetActiveShip({ ship: this.shipList[$event.value] })
    );
  }

  public onChangeStats($event: MatSelectChange): void {
    this.initialStat = $event.value;
    this.store.dispatch(
      ShipActions.SetActiveShipStat({ shipStat: this.statList[$event.value] })
    );
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipArray)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((ship) => {
        this.shipList = ship;
      });
    this.store
      .select(selectShipActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        if (active.ship) {
          this.statList = Object.values(active.ship.stats);
        }
      });
    this.store
      .select(selectNavigationShipClass)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.clear();
        this.loadArray();
      });
  }

  private loadArray() {
    this.store.dispatch(ShipActions.LoadArray({}));
  }

  private clear(clearNation: boolean = true): void {
    this.initialShip = null;
    this.initialStat = null;
    if (clearNation) {
      this.initialNation = null;
    }
    this.statList = [];
    this.store.dispatch(ShipActions.SetActiveShip({}));
    this.store.dispatch(ShipActions.SetActiveShipStat({}));
  }
}
