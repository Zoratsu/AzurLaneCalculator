import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EquipmentType } from '@app/models/equipment';
import { AppState } from '@app/store';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import {
  selectNavigationEquipmentType,
  selectNavigationSelectedEquipmentType,
} from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-slot-select',
  templateUrl: './ship-slot-select.component.html',
  styleUrls: ['./ship-slot-select.component.scss'],
})
export class ShipSlotSelectComponent implements OnInit, OnDestroy {
  public equipmentTypeList: EquipmentType[] = [];
  public equipmentTypeListFilter: EquipmentType[] = [];
  public initialEquipmentType?: EquipmentType;
  public filter: FormControl = new FormControl();

  private ngUnsubscribe = new Subject();

  public constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onChange(): void {
    if (this.initialEquipmentType) {
      this.store.dispatch(
        NavigationActions.SetSelectedEquipmentType({
          equipmentType: this.initialEquipmentType,
        })
      );
      this.snackBar.open(`Selected ${this.initialEquipmentType}`, 'Ok', {
        duration: 2000,
      });
    }
  }

  public onFilter(): void {
    this.loadEquipmentTypeList(this.filter.value);
  }

  private loadSubscription(): void {
    this.store
      .select(selectNavigationEquipmentType)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((equipmentType) => {
        if (Array.isArray(equipmentType)) {
          this.equipmentTypeList = [...equipmentType];
        }
        this.clear();
      });
    this.store
      .select(selectNavigationSelectedEquipmentType)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((selectedEquipmentType) => {
        this.initialEquipmentType = selectedEquipmentType;
      });
  }

  private clear(fullClear: boolean = true): void {
    if (fullClear) {
      this.initialEquipmentType = undefined;
    }
    this.loadEquipmentTypeList();
  }

  private loadEquipmentTypeList(filter?: string): void {
    if (filter && filter.trim().length > 0) {
      this.equipmentTypeListFilter = this.equipmentTypeList
        .filter((nation) => nation.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => (a > b ? 1 : -1));
    } else {
      this.equipmentTypeListFilter = this.equipmentTypeList.sort((a, b) =>
        a > b ? 1 : -1
      );
    }
  }
}
