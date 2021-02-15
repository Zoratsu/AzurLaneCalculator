import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { IGun } from '@app/models/gun';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { selectGunArray } from '@app/store/selectors/gun.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gun-list',
  templateUrl: './gun-list.component.html',
  styleUrls: ['./gun-list.component.scss'],
})
export class GunListComponent implements OnInit {
  public gunList: IGun[] = [];

  private ngUnsubscribe = new Subject();

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public onChange($event: MatSelectChange): void {
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
  }
}
