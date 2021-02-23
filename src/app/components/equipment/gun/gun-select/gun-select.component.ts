import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { IGun, IGunTier } from '@app/models/gun';
import { Nation } from '@app/models/nation';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import {
  selectGunActive,
  selectGunArray,
} from '@app/store/selectors/gun.selector';
import {
  selectNavigationEquipmentType,
  selectNavigationShipClass,
} from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gun-select',
  templateUrl: './gun-select.component.html',
  styleUrls: ['./gun-select.component.scss'],
})
export class GunSelectComponent implements OnInit, OnDestroy {
  public gunList: IGun[] = [];
  public gunListFilter: IGun[] = [];
  public initialGun: any = null;
  public tierList: IGunTier[] = [];
  public tierListFilter: IGunTier[] = [];
  public initialTier: any = null;
  public nationList: Nation[] = [];
  public nationListFilter: Nation[] = [];
  public initialNation: any = null;

  private ngUnsubscribe = new Subject();
  public filter: FormControl = new FormControl();

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
    this.loadArray();
    this.nationList = Object.values(Nation).sort((a, b) => (a > b ? 1 : -1));
    this.loadNationList();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onChangeNationality($event: MatSelectChange): void {
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

  public onNationFilter(): void {
    this.loadNationList(this.filter.value);
  }

  public onGunFilter(): void {
    this.loadGunList(this.filter.value);
  }

  public onTierFilter(): void {
    this.loadTierList(this.filter.value);
  }

  private loadSubscription(): void {
    this.store
      .select(selectGunArray)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((guns) => {
        this.gunList = guns;
        this.loadGunList();
      });
    this.store
      .select(selectGunActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        if (active.gun) {
          this.tierList = Object.values(active.gun.tiers);
          this.loadTierList();
        }
      });
    this.store
      .select(selectNavigationShipClass)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.clear();
        this.loadArray();
      });
    this.store
      .select(selectNavigationEquipmentType)
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
      this.initialNation = 0;
    }
    this.tierList = [];
    this.store.dispatch(GunActions.SetActiveGun({}));
    this.store.dispatch(GunActions.SetActiveTier({}));
    this.loadNationList();
    this.loadGunList();
    this.loadTierList();
  }

  private loadNationList(filter?: string): void {
    if (filter && filter.trim().length > 0) {
      this.nationListFilter = this.nationList
        .filter((nation) => nation.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => (a > b ? 1 : -1));
    } else {
      this.nationListFilter = this.nationList.sort((a, b) => (a > b ? 1 : -1));
    }
  }

  private loadGunList(filter?: string): void {
    if (filter && filter.trim().length > 0) {
      this.gunListFilter = this.gunList.filter((gun) => {
        return gun.name.toLowerCase().includes(filter.toLowerCase());
      });
    } else {
      this.gunListFilter = this.gunList;
    }
  }

  private loadTierList(filter?: string): void {
    if (filter && filter.trim().length > 0) {
      this.tierListFilter = this.tierList.filter((tier) =>
        tier.rarity.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      this.tierListFilter = this.tierList;
    }
  }
}
