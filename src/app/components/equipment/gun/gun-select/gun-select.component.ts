import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { IEquipment, IEquipmentTier } from '@app/models/equipment';
import { Nation } from '@app/models/nation';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import {
  selectEquipmentActive,
  selectEquipmentArray,
} from '@app/store/selectors/equipment.selector';
import {
  selectNavigationSelectedEquipmentType,
  selectNavigationShipSlot,
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

  public onChangeNationality($event: MatSelectChange): void {
    this.initialNation = $event.value;
    if (this.initialNation) {
      this.store.dispatch(
        EquipmentActions.LoadArray({
          nation: this.initialNation,
        })
      );
      this.utilService.createSnack(
        `Selected Nation: '${this.initialNation}'`,
        'Ok'
      );
    }
  }

  public onChangeGun($event: MatSelectChange): void {
    this.initialEquipment = $event.value;
    if (this.initialEquipment) {
      this.store.dispatch(
        EquipmentActions.SetActiveEquipment({
          equipment: this.initialEquipment,
        })
      );
      this.utilService.createSnack(
        `Selected Gun '${this.initialEquipment.name}'`,
        'Ok'
      );
    }
  }

  public onChangeTier($event: MatSelectChange): void {
    this.initialTier = $event.value;
    if (this.initialTier) {
      this.store.dispatch(
        EquipmentActions.SetActiveTier({ tier: this.initialTier })
      );
      this.utilService.createSnack(
        `Selected Tier '${this.initialTier.rarity}'`,
        'Ok'
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
        this.initialEquipment = undefined;
        this.initialTier = undefined;
        this.equipmentList = equipments;
        this.loadGunList();
      });
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        if (active.equipment) {
          this.tierList = Object.values(active.equipment.tiers);
          this.loadTierList();
        } else {
          this.initialTier = undefined;
          this.tierList = [];
          this.loadTierList();
        }
      });
    this.store
      .select(selectNavigationSelectedEquipmentType)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.initialNation = Nation.default;
        this.initialEquipment = undefined;
        this.initialTier = undefined;
        this.store.dispatch(EquipmentActions.LoadArray({}));
      });
    this.store
      .select(selectNavigationShipSlot)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.initialNation = Nation.default;
        this.initialEquipment = undefined;
        this.initialTier = undefined;
        this.store.dispatch(EquipmentActions.LoadArray({}));
      });
  }

  private loadNationList(filter?: string): void {
    this.nationListFilter = this.utilService.loadNationList(filter);
  }

  private loadGunList(filter?: string): void {
    this.equipmentListFilter = this.utilService.filterEquipmentList(
      this.equipmentList,
      filter
    );
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
