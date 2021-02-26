import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IEquipment, IEquipmentTier } from '@app/models/equipment';
import { Nation } from '@app/models/nation';
import { UtilService } from '@app/services/util.service';
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
  selector: 'app-anti-air-select',
  templateUrl: './anti-air-select.component.html',
  styleUrls: ['./anti-air-select.component.scss'],
})
export class AntiAirSelectComponent implements OnInit, OnDestroy {
  public equipmentList: IEquipment[] = [];
  public equipmentListFilter: IEquipment[] = [];
  public initialEquipment?: IEquipment;

  public tierList: IEquipmentTier[] = [];
  public tierListFilter: IEquipmentTier[] = [];
  public initialTier?: IEquipmentTier;

  public nationListFilter: Nation[] = [];
  public initialNation: Nation = Nation.default;

  private ngUnsubscribe = new Subject();
  public filter: FormControl = new FormControl();

  public constructor(
    private store: Store<AppState>,
    private utilService: UtilService
  ) {}

  public ngOnInit(): void {
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

  public onChangeAntiAir(): void {
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
      .subscribe((equipments) => {
        this.equipmentList = equipments;
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
      this.store.dispatch(EquipmentActions.ClearActiveEquipment());
      this.initialEquipment = undefined;
      this.initialTier = undefined;
      this.initialNation = Nation.default;
    }
    this.tierList = [];
    this.loadNationList();
    this.loadGunList();
    this.loadTierList();
  }

  private loadNationList(filter?: string): void {
    this.nationListFilter = this.utilService.loadNationList(filter);
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
