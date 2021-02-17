import { Injectable } from '@angular/core';
import { GunService } from '@app/services/gun.service';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { selectNavigationShipClass } from '@app/store/selectors/navigation.selector';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class GunEffects {
  constructor(
    private action$: Actions,
    private gunService: GunService,
    private store: Store<AppState>
  ) {}

  setActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunActions.SetActive),
      mergeMap(({ gun }) => of(GunActions.ProcessActive({ active: gun })))
    )
  );

  loadArray$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunActions.LoadArray),
      withLatestFrom(this.store.select(selectNavigationShipClass)),
      mergeMap(([{ name }, shipClass]) =>
        this.gunService
          .getGuns(shipClass, name)
          .pipe(map((guns) => GunActions.LoadArraySuccess({ guns })))
      )
    )
  );

  processActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunActions.ProcessActive),
      mergeMap(({ active }) =>
        this.gunService
          .calculateGunDps(active)
          .pipe(
            map((calculation) =>
              GunActions.ProcessActiveSuccess({ calculation })
            )
          )
      )
    )
  );
}
