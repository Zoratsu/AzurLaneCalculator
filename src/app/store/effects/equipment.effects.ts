import { Injectable } from '@angular/core';
import { EquipmentService } from '@app/services/equipment.service';
import { AppState } from '@app/store';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import { selectEquipmentActive } from '@app/store/selectors/equipment.selector';
import { selectNavigationSelectedEquipmentType } from '@app/store/selectors/navigation.selector';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable()
export class EquipmentEffects {
  constructor(
    private action$: Actions,
    private equipmentService: EquipmentService,
    private store: Store<AppState>
  ) {}

  loadArray$ = createEffect(() =>
    this.action$.pipe(
      ofType(EquipmentActions.LoadArray),
      withLatestFrom(this.store.select(selectNavigationSelectedEquipmentType)),
      filter(([, equipmentType]) => !!equipmentType),
      distinctUntilChanged(
        (
          [{ nation: nationA }, equipmentA],
          [{ nation: nationB }, equipmentB]
        ) => equipmentA === equipmentB && nationA === nationB
      ),
      switchMap(([{ nation }, equipmentType]) =>
        this.equipmentService
          .getEquipment(equipmentType, nation)
          .pipe(
            map((equipments) =>
              EquipmentActions.LoadArraySuccess({ equipments })
            )
          )
      )
    )
  );

  setActiveEquipment$ = createEffect(() =>
    this.action$.pipe(
      ofType(EquipmentActions.SetActiveEquipment),
      mergeMap(() => [
        EquipmentActions.ClearActiveTier(),
        EquipmentActions.ClearCalculation(),
      ])
    )
  );

  setActiveTier$ = createEffect(() =>
    this.action$.pipe(
      ofType(EquipmentActions.SetActiveTier),
      mergeMap(() => [EquipmentActions.ProcessActive()])
    )
  );

  clearActiveEquipment$ = createEffect(() =>
    this.action$.pipe(
      ofType(EquipmentActions.ClearActiveEquipment),
      mergeMap(() => [
        EquipmentActions.ClearActiveTier(),
        EquipmentActions.ClearCalculation(),
      ])
    )
  );

  processActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(EquipmentActions.ProcessActive),
      withLatestFrom(this.store.select(selectEquipmentActive)),
      mergeMap(([, active]) =>
        this.equipmentService.calculateDPS(active).pipe(
          map((calculation) =>
            EquipmentActions.ProcessActiveSuccess({ calculation })
          ),
          catchError(() => [
            EquipmentActions.ProcessActiveFailed(),
            EquipmentActions.ClearCalculation(),
          ])
        )
      )
    )
  );

  processActiveSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(EquipmentActions.ProcessActiveSuccess),
      mergeMap(({ calculation }) => [
        EquipmentActions.SetCalculation({ calculation }),
      ])
    )
  );
}
