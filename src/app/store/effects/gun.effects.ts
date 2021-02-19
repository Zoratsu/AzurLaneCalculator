import { Injectable } from '@angular/core';
import { GunService } from '@app/services/gun.service';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { selectGunActive } from '@app/store/selectors/gun.selector';
import { selectNavigationShipClass } from '@app/store/selectors/navigation.selector';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class GunEffects {
  constructor(
    private action$: Actions,
    private gunService: GunService,
    private store: Store<AppState>
  ) {}

  loadArray$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunActions.LoadArray),
      withLatestFrom(this.store.select(selectNavigationShipClass)),
      mergeMap(([{ nation }, shipClass]) =>
        this.gunService
          .getGuns(shipClass, nation)
          .pipe(map((guns) => GunActions.LoadArraySuccess({ guns })))
      )
    )
  );

  processActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunActions.ProcessActive),
      withLatestFrom(this.store.select(selectGunActive)),
      mergeMap(([, active]) =>
        this.gunService.calculateGunDps(active).pipe(
          tap((c) => console.log(c)),
          map((calculation) => GunActions.ProcessActiveSuccess({ calculation }))
        )
      )
    )
  );
}
