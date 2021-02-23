import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGun, IGunTier } from '@app/models/gun';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import {
  selectGunActive,
  selectGunCalculationIsActive,
  selectGunIsActive,
} from '@app/store/selectors/gun.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gun-home',
  templateUrl: './gun-home.component.html',
  styleUrls: ['./gun-home.component.scss'],
})
export class GunHomeComponent implements OnInit, OnDestroy {
  public isGunActive: boolean = false;
  public isGunCalculationActive: boolean = false;

  public active?: { gun?: IGun; tier?: IGunTier };

  private ngUnsubscribe = new Subject();

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private loadSubscription(): void {
    this.store
      .select(selectGunIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.isGunActive = active;
        if (active) {
          this.store.dispatch(GunActions.ProcessActive());
        }
      });
    this.store
      .select(selectGunCalculationIsActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isActive) => (this.isGunCalculationActive = isActive));
    this.store
      .select(selectGunActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => (this.active = active));
  }

  get getTitle(): string {
    return `${this.active?.gun?.name} | ${this.active?.tier?.rarity} ${this.active?.tier?.stars}`;
  }
}
