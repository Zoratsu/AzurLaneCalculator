import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IEquipment, IEquipmentTier } from '@app/models/equipment';
import { Nation } from '@app/models/nation';
import { AppState } from '@app/store';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import {
  selectEquipmentActive,
  selectEquipmentArray,
} from '@app/store/selectors/equipment.selector';
import { selectNavigationSelectedEquipmentType } from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gun-select',
  templateUrl: './gun-select.component.html',
  styleUrls: ['./gun-select.component.scss'],
})
export class GunSelectComponent implements OnInit, OnDestroy {
  public equipmentList: IEquipment[] = [];
  public equipmentListFilter: IEquipment[] = [];
  public initialEquipment?: IEquipment;

  public tierList: IEquipmentTier[] = [];
  public tierListFilter: IEquipmentTier[] = [];
  public initialTier?: IEquipmentTier;

  public nationList: Nation[] = [];
  public nationListFilter: Nation[] = [];
  public initialNation: Nation = Nation.default;

  private ngUnsubscribe = new Subject();
  public filter: FormControl = new FormControl();

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.nationList = Object.values(Nation).sort((a, b) => (a > b ? 1 : -1));
    this.loadNationList();
    this.loadArray();
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onChangeNationality(): void {
    this.store.dispatch(
      EquipmentActions.LoadArray({ nation: this.initialNation })
    );
  }

  public onChangeGun(): void {
    this.clear(false);
    if (this.initialEquipment) {
      this.store.dispatch(
        EquipmentActions.SetActiveEquipment({
          equipment: this.initialEquipment,
        })
      );
    }
  }

  public onChangeTier(): void {
    if (this.initialTier) {
      this.store.dispatch(
        EquipmentActions.SetActiveTier({ tier: this.initialTier })
      );
    }
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
      .select(selectEquipmentArray)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((guns) => {
        this.equipmentList = guns;
        this.clear();
      });
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        if (active.equipment) {
          this.tierList = Object.values(active.equipment.tiers);
          this.loadTierList();
        }
      });
    this.store
      .select(selectNavigationSelectedEquipmentType)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.clear();
        this.loadArray();
      });
  }

  private loadArray() {
    this.store.dispatch(EquipmentActions.LoadArray({}));
  }

  private clear(fullClear: boolean = true): void {
    if (fullClear) {
      this.initialEquipment = undefined;
      this.initialTier = undefined;
      this.initialNation = Nation.default;
    }
    this.tierList = [];
    this.store.dispatch(EquipmentActions.ClearActiveEquipment());
    this.store.dispatch(EquipmentActions.ClearActiveTier());
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
      this.equipmentListFilter = this.equipmentList.filter((gun) => {
        return gun.name.toLowerCase().includes(filter.toLowerCase());
      });
    } else {
      this.equipmentListFilter = this.equipmentList;
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
