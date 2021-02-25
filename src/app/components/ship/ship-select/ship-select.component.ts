import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Nation } from '@app/models/nation';
import { IShip, IShipStat } from '@app/models/ship';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { ShipActions } from '@app/store/actions/ship.actions';
import { selectNavigationShipClass } from '@app/store/selectors/navigation.selector';
import {
  selectShipActive,
  selectShipArray,
} from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship-select',
  templateUrl: './ship-select.component.html',
  styleUrls: ['./ship-select.component.scss'],
})
export class ShipSelectComponent implements OnInit, OnDestroy {
  public shipList: IShip[] = [];
  public shipListFilter: IShip[] = [];
  public initialShip?: IShip;
  public statsList: IShipStat[] = [];
  public statsListFilter: IShipStat[] = [];
  public initialStats?: IShipStat;
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
    this.store.dispatch(ShipActions.LoadArray({ nation: this.initialNation }));
  }

  public onChangeShip(): void {
    this.clear(false);
    if (this.initialShip) {
      this.store.dispatch(
        ShipActions.SetActiveShip({ ship: this.initialShip })
      );
    }
  }

  public onChangeStats(): void {
    if (this.initialStats) {
      this.store.dispatch(
        ShipActions.SetActiveShipStat({
          shipStat: this.initialStats,
        })
      );
    }
  }

  public onNationFilter(): void {
    this.loadNationList(this.filter.value);
  }

  public onShipFilter(): void {
    this.loadShipList(this.filter.value);
  }

  public onStatsFilter(): void {
    this.loadStatsList(this.filter.value);
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipArray)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((ships) => {
        this.shipList = ships;
        this.clear();
      });
    this.store
      .select(selectShipActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        if (active.ship) {
          this.statsList = Object.values(active.ship.stats);
          this.loadStatsList();
        }
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
    this.store.dispatch(ShipActions.LoadArray({}));
  }

  private clear(fullClear: boolean = true): void {
    if (fullClear) {
      this.initialShip = undefined;
      this.initialStats = undefined;
      this.initialNation = Nation.default;
    }
    this.statsList = [];
    this.store.dispatch(ShipActions.ClearActiveShip());
    this.store.dispatch(NavigationActions.ClearShipSlot());
    this.loadNationList();
    this.loadShipList();
    this.loadStatsList();
  }

  private loadNationList(filter?: string): void {
    this.nationListFilter = this.utilService.loadNationList(filter);
  }

  private loadShipList(filter?: string): void {
    if (filter && filter.trim().length > 0) {
      this.shipListFilter = this.shipList.filter((ship) => {
        return ship.name.toLowerCase().includes(filter.toLowerCase());
      });
    } else {
      this.shipListFilter = this.shipList;
    }
  }

  private loadStatsList(filter?: string): void {
    if (filter && filter.trim().length > 0) {
      this.statsListFilter = this.statsList.filter((stat) =>
        stat.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      this.statsListFilter = this.statsList;
    }
  }
}
