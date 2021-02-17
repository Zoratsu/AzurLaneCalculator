import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { IShip } from '@app/models/ship';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { ShipActions } from '@app/store/actions/ship.actions';
import { selectNavigationShipClass } from '@app/store/selectors/navigation.selector';
import { selectShipArray } from '@app/store/selectors/ship.selector';
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
  public initial: any = null;

  private ngUnsubscribe = new Subject();

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
    this.loadArray();
  }

  public onChange($event: MatSelectChange): void {
    this.store.dispatch(
      ShipActions.SetActive({ ship: this.shipList[$event.value] })
    );
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipArray)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((guns) => {
        this.shipList = guns;
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

  private clear(): void {
    this.initial = null;
    this.store.dispatch(ShipActions.SetActive({}));
  }
}
