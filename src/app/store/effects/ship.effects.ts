import { Injectable } from '@angular/core';
import { SlotID } from '@app/models/ship';
import { ShipService } from '@app/services/ship.service';
import { AppState } from '@app/store';
import { ShipActions } from '@app/store/actions/ship.actions';
import {
  selectEquipmentActive,
  selectEquipmentCalculation,
} from '@app/store/selectors/equipment.selector';
import { selectNavigationShipClass } from '@app/store/selectors/navigation.selector';
import {
  selectShipActive,
  selectShipActiveSlot,
} from '@app/store/selectors/ship.selector';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';

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
        this.store.select(selectEquipmentCalculation),
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

  equipGun$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShipActions.EquipGun),
      withLatestFrom(
        this.store.select(selectEquipmentActive),
        this.store.select(selectShipActiveSlot)
      ),
      mergeMap(([, active, slot]) =>
        this.shipService
          .createEquippedSlots(active, slot)
          .pipe(map((slots) => ShipActions.SetSlots({ slots })))
      )
    )
  );
}
