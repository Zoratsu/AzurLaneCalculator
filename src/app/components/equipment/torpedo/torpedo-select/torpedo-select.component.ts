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
  selector: 'app-torpedo-select',
  templateUrl: './torpedo-select.component.html',
  styleUrls: ['./torpedo-select.component.scss'],
})
export class TorpedoSelectComponent implements OnInit, OnDestroy {
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
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onChangeNationality(): void {
    this.loadArray();
  }

  public onChangeTorpedo(): void {
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

  public onTorpedoFilter(): void {
    this.loadTorpedoList(this.filter.value);
  }

  public onTierFilter(): void {
    this.loadTierList(this.filter.value);
  }

  private loadSubscription(): void {
    this.store
      .select(selectEquipmentArray)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((equipments) => {
        if (this.equipmentList !== equipments) {
          this.equipmentList = equipments;
          if (equipments) {
            this.clear();
          }
        }
      });
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.initialEquipment = undefined;
        this.initialTier = undefined;
        if (active.equipment) {
          this.tierList = Object.values(active.equipment.tiers);
          this.loadTierList();
        } else {
          this.tierList = [];
          this.loadTierList();
        }
      });
    this.store
      .select(selectNavigationSelectedEquipmentType)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((equipmentType) => {
        if (this.initialEquipment !== equipmentType) {
          this.clear();
          this.loadArray();
        }
      });
  }

  private loadArray() {
    this.store.dispatch(EquipmentActions.LoadArray({}));
  }

  private clear(fullClear: boolean = true): void {
    if (fullClear) {
      if (this.initialEquipment) {
        this.store.dispatch(EquipmentActions.ClearActiveEquipment());
      }
      this.initialEquipment = undefined;
      this.initialTier = undefined;
      this.initialNation = Nation.default;
    }
    this.tierList = [];
    this.loadNationList();
    this.loadTorpedoList();
    this.loadTierList();
  }

  private loadNationList(filter?: string): void {
    this.nationListFilter = this.utilService.loadNationList(filter);
  }

  private loadTorpedoList(filter?: string): void {
    if (filter && filter.trim().length > 0) {
      this.equipmentListFilter = this.equipmentList.filter((torpedo) => {
        return torpedo.name.toLowerCase().includes(filter.toLowerCase());
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
