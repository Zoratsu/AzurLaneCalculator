import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { IGun, IGunTier } from '@app/models/gun';
import { Nation } from '@app/models/nation';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import {
  selectGunActive,
  selectGunArray,
} from '@app/store/selectors/gun.selector';
import { selectNavigationShipClass } from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gun-select',
  templateUrl: './gun-select.component.html',
  styleUrls: ['./gun-select.component.scss'],
})
export class GunSelectComponent implements OnInit {
  public gunList: IGun[] = [];
  public initialGun: any = null;
  public tierList: IGunTier[] = [];
  public initialTier: any = null;
  public nationList: Nation[] = [];
  public initialNation: any = 0;

  private ngUnsubscribe = new Subject();

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
    this.loadArray();
    this.nationList = Object.values(Nation);
  }

  public onChangeNationality($event: MatSelectChange): void {
    this.clear(false);
    this.initialNation = $event.value;
    this.store.dispatch(
      GunActions.LoadArray({ nation: this.nationList[$event.value] })
    );
  }

  public onChangeGun($event: MatSelectChange): void {
    this.clear(false);
    this.initialGun = $event.value;
    this.store.dispatch(
      GunActions.SetActiveGun({ gun: this.gunList[$event.value] })
    );
  }

  public onChangeTier($event: MatSelectChange): void {
    this.initialTier = $event.value;
    this.store.dispatch(
      GunActions.SetActiveTier({ tier: this.tierList[$event.value] })
    );
  }

  private loadSubscription(): void {
    this.store
      .select(selectGunArray)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((guns) => {
        this.gunList = guns;
      });
    this.store
      .select(selectGunActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        if (active.gun) {
          this.tierList = Object.values(active.gun.tiers);
        }
      });
    this.store
      .select(selectNavigationShipClass)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.clear();
        this.loadArray();
      });
  }

  private loadArray() {
    this.store.dispatch(GunActions.LoadArray({}));
  }

  private clear(clearNation: boolean = true): void {
    this.initialGun = null;
    this.initialTier = null;
    if (clearNation) {
      this.initialNation = null;
    }
    this.tierList = [];
    this.store.dispatch(GunActions.SetActiveGun({}));
    this.store.dispatch(GunActions.SetActiveTier({}));
  }
}
