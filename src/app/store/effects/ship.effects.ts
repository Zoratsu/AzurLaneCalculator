import { Injectable } from '@angular/core';
import { ShipService } from '@app/services/ship.service';
import { AppState } from '@app/store';
import { ShipActions } from '@app/store/actions/ship.actions';
import { selectEquipmentActive } from '@app/store/selectors/equipment.selector';
import { selectNavigationHullType } from '@app/store/selectors/navigation.selector';
import {
  selectShipActive,
  selectShipActiveSlot,
} from '@app/store/selectors/ship.selector';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  distinctUntilChanged,
  exhaustMap,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

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
      withLatestFrom(this.store.select(selectNavigationHullType)),
      filter(([, shipHull]) => !!shipHull),
      distinctUntilChanged(
        (
          [{ nation: nationA }, equipmentA],
          [{ nation: nationB }, equipmentB]
        ) => equipmentA === equipmentB && nationA === nationB
      ),
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
      withLatestFrom(this.store.select(selectShipActive)),
      filter(
        ([, active]) =>
          !!active &&
          !!active.ship &&
          !!active.shipStat &&
          !!active.shipSlotsEfficiencies &&
          !!active.shipSlots &&
          !!active.shipBuff
      ),
      distinctUntilChanged(([, a], [, b]) => {
        return JSON.stringify(a) === JSON.stringify(b);
      }),
      mergeMap(([, active]) =>
        this.shipService
          .calculateShipDps(active)
          .pipe(
            map((calculation) =>
              ShipActions.ProcessActiveSuccess({ calculation })
            )
          )
      )
    )
  );

  clearActiveShip$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShipActions.ClearActiveShip),
      mergeMap(() => [
        ShipActions.ClearActiveShipStat(),
        ShipActions.ClearActiveShipSlots(),
        ShipActions.ClearActiveShipSlotEfficiencies(),
        ShipActions.ClearActiveShipBuff(),
      ])
    )
  );

  equipEquipment$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShipActions.EquipEquipment),
      withLatestFrom(
        this.store.select(selectEquipmentActive),
        this.store.select(selectShipActiveSlot)
      ),
      mergeMap(([, active, slot]) =>
        this.shipService
          .createEquippedSlots(active, slot)
          .pipe(map((slots) => ShipActions.SetActiveShipSlots({ slots })))
      )
    )
  );

  setActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        ShipActions.SetActiveShipStat,
        ShipActions.SetActiveShipSlots,
        ShipActions.SetActiveShipSlotEfficiencies,
        ShipActions.SetActiveShipBuff
      ),
      exhaustMap(() => [ShipActions.ProcessActive()])
    )
  );

  setActiveShip$ = createEffect(() =>
    this.action$.pipe(
      ofType(ShipActions.SetActiveShip),
      switchMap(() => [
        ShipActions.ClearActiveShipStat(),
        ShipActions.ClearActiveShipSlots(),
        ShipActions.ClearActiveShipSlotEfficiencies(),
        ShipActions.ClearActiveShipBuff(),
      ])
    )
  );
}
