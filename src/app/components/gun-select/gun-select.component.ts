import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { IGun } from '@app/models/gun';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { selectGunArray } from '@app/store/selectors/gun.selector';
import { selectNavigationShipClass } from '@app/store/selectors/navigation.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gun-select',
  templateUrl: './gun-select.component.html',
  styleUrls: ['./gun-select.component.scss'],
})
export class GunSelectComponent implements OnInit {
  public gunList: IGun[] = [];
  public initial: any = null;
  private ngUnsubscribe = new Subject();

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
    this.loadArray();
  }

  public onChange($event: MatSelectChange): void {
    this.initial = $event.value;
    this.store.dispatch(
      GunActions.SetActive({ gun: this.gunList[$event.value] })
    );
  }

  private loadSubscription(): void {
    this.store
      .select(selectGunArray)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((guns) => {
        this.gunList = guns;
      });
    this.store
      .select(selectNavigationShipClass)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.clear();
        this.loadArray();
      });
  }

  private loadArray() {
    this.store.dispatch(GunActions.LoadArray({}));
  }

  private clear(): void {
    this.initial = null;
    this.store.dispatch(GunActions.SetActive({}));
  }
}
