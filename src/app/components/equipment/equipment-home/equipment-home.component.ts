import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import { selectNavigationEquipmentTypeIsGun } from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-equipment-home',
  templateUrl: './equipment-home.component.html',
  styleUrls: ['./equipment-home.component.scss'],
})
export class EquipmentHomeComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  private gun: boolean = false;

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get isGun(): boolean {
    return this.gun;
  }

  private loadSubscription(): void {
    this.store
      .select(selectNavigationEquipmentTypeIsGun)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((isGun) => (this.gun = isGun));
  }
}
