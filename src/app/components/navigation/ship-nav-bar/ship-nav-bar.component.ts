import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EquipmentType } from '@app/models/equipment';
import { ShipSlotNavigation } from '@app/models/navigation';
import { IShip, IShipSlot } from '@app/models/ship';
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

  public constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
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
    switch (position) {
      case 0:
        return this.ship?.slots.primary.type || EquipmentType.default;
      case 1:
        return this.ship?.slots.secondary.type || EquipmentType.default;
      case 2:
        return this.ship?.slots.tertiary.type || EquipmentType.default;
      default:
        return EquipmentType.default;
    }
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(({ ship }) => {
        this.ship = ship;
        this.tabs = [
          this.getName(ship),
          this.getSlotPrimary(ship),
          this.getSlotSecondary(ship),
          this.getSlotThird(ship),
          'Calculations',
        ];
      });
  }

  private getName(ship?: IShip): string {
    return ship ? `${ship.name} Stats` : 'Ship';
  }

  private getSlot(slot: IShipSlot): string {
    if (Array.isArray(slot.type)) {
      return 'Mixed Slot';
    } else {
      return slot.type;
    }
  }

  private getSlotPrimary(ship?: IShip): string {
    return ship ? this.getSlot(ship.slots.primary) : 'First Slot';
  }

  private getSlotSecondary(ship?: IShip): string {
    return ship ? this.getSlot(ship.slots.secondary) : 'Second Slot';
  }

  private getSlotThird(ship?: IShip): string {
    return ship ? this.getSlot(ship.slots.tertiary) : 'Third Slot';
  }
}
