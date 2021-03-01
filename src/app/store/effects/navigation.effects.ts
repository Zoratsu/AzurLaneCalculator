import { Injectable } from '@angular/core';
import { EquipmentService } from '@app/services/equipment.service';
import { GunService } from '@app/services/gun.service';
import { AppState } from '@app/store';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { ShipActions } from '@app/store/actions/ship.actions';
import { selectEquipmentActive } from '@app/store/selectors/equipment.selector';
import { selectNavigationSelectedEquipmentType } from '@app/store/selectors/navigation.selector';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class NavigationEffects {
  constructor(private action$: Actions) {}

  setActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(NavigationActions.SetEquipmentType),
      mergeMap(() => [NavigationActions.ClearSelectedEquipmentType()])
    )
  );
}
