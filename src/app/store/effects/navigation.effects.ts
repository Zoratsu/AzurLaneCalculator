import { Injectable } from '@angular/core';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { ShipActions } from '@app/store/actions/ship.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class NavigationEffects {
  constructor(private action$: Actions) {}

  setEquipmentType$ = createEffect(() =>
    this.action$.pipe(
      ofType(NavigationActions.SetEquipmentType),
      mergeMap(() => [
        NavigationActions.ClearSelectedEquipmentType(),
        EquipmentActions.ClearActiveEquipment(),
      ])
    )
  );

  setHullType$ = createEffect(() =>
    this.action$.pipe(
      ofType(NavigationActions.SetHullType),
      mergeMap(() => [ShipActions.ClearActiveShip()])
    )
  );
}
