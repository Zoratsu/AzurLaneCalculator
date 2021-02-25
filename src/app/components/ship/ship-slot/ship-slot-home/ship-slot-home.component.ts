import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import {
  selectNavigationEquipmentTypeIsGun,
  selectNavigationEquipmentTypeIsMixed,
} from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-slot-home',
  templateUrl: './ship-slot-home.component.html',
  styleUrls: ['./ship-slot-home.component.scss'],
})
export class ShipSlotHomeComponent implements OnInit, OnDestroy {
  public isGun: boolean = false;
  public isMixed: boolean = false;

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
      .select(selectNavigationEquipmentTypeIsGun)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isGun) => (this.isGun = isGun));
    this.store
      .select(selectNavigationEquipmentTypeIsMixed)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isMixed) => (this.isMixed = isMixed));
  }
}
