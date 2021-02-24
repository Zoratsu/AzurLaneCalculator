import { Injectable } from '@angular/core';
import { ShipService } from '@app/services/ship.service';
import { AppState } from '@app/store';
import { ShipActions } from '@app/store/actions/ship.actions';
import { selectGunCalculation } from '@app/store/selectors/gun.selector';
import { selectNavigationShipClass } from '@app/store/selectors/navigation.selector';
import { selectShipActive } from '@app/store/selectors/ship.selector';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class ShipEffects {
  constructor(
    private action$: Actions,
    private shipService: ShipService,
    private store: Store<AppState>
  ) {}

  loadArray$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShipActions.LoadArray),
      withLatestFrom(this.store.select(selectNavigationShipClass)),
      mergeMap(([{ nation }, shipClass]) =>
        this.shipService
          .getShips(shipClass, nation)
          .pipe(map((ships) => ShipActions.LoadArraySuccess({ ships })))
      )
    )
  );

  processActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShipActions.ProcessActive),
      withLatestFrom(
        this.store.select(selectGunCalculation),
        this.store.select(selectShipActive)
      ),
      mergeMap(([, gunCalculation, { ship, shipStat }]) =>
        this.shipService
          .calculateShipDps(gunCalculation, ship, shipStat)
          .pipe(
            map((calculation) =>
              ShipActions.ProcessActiveSuccess({ calculation })
            )
          )
      )
    )
  );
}
