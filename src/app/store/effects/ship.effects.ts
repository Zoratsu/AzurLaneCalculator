import { Injectable } from '@angular/core';
import { ShipService } from '@app/services/ship.service';
import { AppState } from '@app/store';
import { ShipActions } from '@app/store/actions/ship.actions';
import { selectGunCalculation } from '@app/store/selectors/gun.selector';
import { selectNavigationShipClass } from '@app/store/selectors/navigation.selector';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class ShipEffects {
  constructor(
    private action$: Actions,
    private shipService: ShipService,
    private store: Store<AppState>
  ) {}

  setActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShipActions.SetActive),
      mergeMap(({ ship }) => of(ShipActions.ProcessActive({ active: ship })))
    )
  );

  loadArray$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShipActions.LoadArray),
      withLatestFrom(this.store.select(selectNavigationShipClass)),
      mergeMap(([{ name }, shipClass]) =>
        this.shipService
          .getShips(shipClass, name)
          .pipe(map((ships) => ShipActions.LoadArraySuccess({ ships })))
      )
    )
  );

  processActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShipActions.ProcessActive),
      withLatestFrom(this.store.select(selectGunCalculation)),
      filter(([{ active }, gun]) => !active || !gun),
      mergeMap(([{ active }, gun]) =>
        this.shipService
          .calculateShipDps(gun, active)
          .pipe(
            map((calculation) =>
              ShipActions.ProcessActiveSuccess({ calculation })
            )
          )
      )
    )
  );
}
