import { Injectable } from '@angular/core';
import { GunService } from '@app/services/gun.service';
import { GunActions } from '@app/store/actions/gun.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class GunEffects {
  constructor(private action$: Actions, private gunService: GunService) {}

  setActive$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunActions.SetActive),
      mergeMap(({ gun }) => of(GunActions.ProcessActive({ active: gun })))
    )
  );

  loadArray$ = createEffect(() =>
    this.action$.pipe(
      ofType(GunActions.LoadArray),
      mergeMap(() =>
        this.gunService
          .getGuns()
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
