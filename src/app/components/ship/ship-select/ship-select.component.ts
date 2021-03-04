import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Nation } from '@app/models/nation';
import { IShip, IShipStat } from '@app/models/ship';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { ShipActions } from '@app/store/actions/ship.actions';
import { selectNavigationHullType } from '@app/store/selectors/navigation.selector';
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
        ShipActions.LoadArray({
          nation: this.initialNation,
        })
      );
      this.utilService.createSnack(
        `Selected Nation: '${this.initialNation}'`,
        'Ok'
      );
    }
  }

  public onChangeShip($event: MatSelectChange): void {
    this.initialShip = $event.value;
    if (this.initialShip) {
      this.store.dispatch(
        ShipActions.SetActiveShip({ ship: this.initialShip })
      );
      this.utilService.createSnack(
        `Selected Ship: '${this.initialShip.name}'`,
        'Ok'
      );
    }
  }

  public onChangeStats($event: MatSelectChange): void {
    this.initialStats = $event.value;
    if (this.initialStats) {
      this.store.dispatch(
        ShipActions.SetActiveShipStat({
          shipStat: this.initialStats,
        })
      );
      this.utilService.createSnack(
        `Selected Level: '${this.initialStats.name}'`,
        'Ok'
      );
      if (this.initialShip) {
        this.store.dispatch(
          ShipActions.SetActiveShipSlotEfficiencies({
            shipSlotsEfficiencies: this.utilService.getSlotsEfficiencies(
              this.initialShip,
              this.initialStats
            ),
          })
        );
      }
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
        this.initialShip = undefined;
        this.initialStats = undefined;
        this.shipList = ships;
        this.loadShipList();
      });
    this.store
      .select(selectShipActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        if (active.ship) {
          this.statsList = Object.values(active.ship.stats);
          this.loadStatsList();
        } else {
          this.initialStats = undefined;
          this.statsList = [];
          this.loadStatsList();
        }
      });
    this.store
      .select(selectNavigationHullType)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((c) => {
        this.initialNation = Nation.default;
        this.initialShip = undefined;
        this.initialStats = undefined;
        this.store.dispatch(ShipActions.LoadArray({}));
      });
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
