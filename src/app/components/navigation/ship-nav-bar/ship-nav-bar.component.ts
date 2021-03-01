import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EquipmentType } from '@app/models/equipment';
import { ShipSlotNavigation } from '@app/models/navigation';
import { IShip, IShipSlot, IShipStat } from '@app/models/ship';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { selectShipActive } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-nav-bar',
  templateUrl: './ship-nav-bar.component.html',
  styleUrls: ['./ship-nav-bar.component.scss'],
})
export class ShipNavBarComponent implements OnInit, OnDestroy {
  public tabs: string[] = [];

  private ngUnsubscribe = new Subject();
  private ship?: IShip;
  private shipStat?: IShipStat;

  public constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private equipmentService: UtilService
  ) {}

  public ngOnInit(): void {
    this.loadSubscription();
    this.store.dispatch(
      NavigationActions.SetShipSlot({ slot: ShipSlotNavigation.ship })
    );
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onChange($event: MatTabChangeEvent): void {
    const slot = $event.index;
    this.store.dispatch(NavigationActions.SetShipSlot({ slot }));
    switch (slot) {
      case ShipSlotNavigation.primary:
        this.store.dispatch(
          NavigationActions.SetEquipmentType({
            equipmentType: this.getEquipmentType(0),
          })
        );
        break;
      case ShipSlotNavigation.secondary:
        this.store.dispatch(
          NavigationActions.SetEquipmentType({
            equipmentType: this.getEquipmentType(1),
          })
        );
        break;
      case ShipSlotNavigation.tertiary:
        this.store.dispatch(
          NavigationActions.SetEquipmentType({
            equipmentType: this.getEquipmentType(2),
          })
        );
        break;
    }
  }

  private getEquipmentType(position: number): EquipmentType | EquipmentType[] {
    if (this.ship && this.shipStat) {
      switch (position) {
        case 0:
          return this.equipmentService.getType(
            this.ship.slots.primary,
            this.shipStat
          );
        case 1:
          return this.equipmentService.getType(
            this.ship.slots.secondary,
            this.shipStat
          );
        case 2:
          return this.equipmentService.getType(
            this.ship.slots.tertiary,
            this.shipStat
          );
        default:
          return EquipmentType.default;
      }
    }
    return EquipmentType.default;
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(({ ship, shipStat }) => {
        this.ship = ship;
        this.shipStat = shipStat;
        this.tabs = [
          this.getName(ship),
          this.getSlotPrimary(ship, shipStat),
          this.getSlotSecondary(ship, shipStat),
          this.getSlotThird(ship, shipStat),
          'Calculations',
        ];
      });
  }

  private getName(ship?: IShip): string {
    return ship ? `${ship.name} Stats` : 'Ship';
  }

  private getSlot(slot: IShipSlot, shipStat: IShipStat): string {
    const type = this.equipmentService.getType(slot, shipStat);
    if (Array.isArray(type)) {
      return 'Mixed Slot';
    } else {
      return type;
    }
  }

  private getSlotPrimary(ship?: IShip, shipStat?: IShipStat): string {
    return ship && shipStat
      ? this.getSlot(ship.slots.primary, shipStat)
      : 'First Slot';
  }

  private getSlotSecondary(ship?: IShip, shipStat?: IShipStat): string {
    return ship && shipStat
      ? this.getSlot(ship.slots.secondary, shipStat)
      : 'Second Slot';
  }

  private getSlotThird(ship?: IShip, shipStat?: IShipStat): string {
    return ship && shipStat
      ? this.getSlot(ship.slots.tertiary, shipStat)
      : 'Third Slot';
  }
}
