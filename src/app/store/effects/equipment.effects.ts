import { Injectable } from '@angular/core';
import { EquipmentService } from '@app/services/equipment.service';
import { GunService } from '@app/services/gun.service';
import { AppState } from '@app/store';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import { selectEquipmentActive } from '@app/store/selectors/equipment.selector';
import { selectNavigationSelectedEquipmentType } from '@app/store/selectors/navigation.selector';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';

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
      mergeMap(([{ nation }, equipmentType]) =>
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

  clearActiveEquipment$ = createEffect(() =>
    this.action$.pipe(
      ofType(EquipmentActions.ClearActiveEquipment),
      mergeMap(() => [EquipmentActions.ClearActiveTier()])
    )
  );

  processActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(EquipmentActions.ProcessActive),
      withLatestFrom(this.store.select(selectEquipmentActive)),
      mergeMap(([, active]) =>
        this.equipmentService
          .calculateDPS(active)
          .pipe(
            map((calculation) =>
              EquipmentActions.ProcessActiveSuccess({ calculation })
            )
          )
      )
    )
  );
}
