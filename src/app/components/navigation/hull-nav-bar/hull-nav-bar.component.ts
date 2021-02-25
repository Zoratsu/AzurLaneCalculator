import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HullType } from '@app/models/ship';
import { AppState } from '@app/store';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-hull-nav-bar',
  templateUrl: './hull-nav-bar.component.html',
  styleUrls: ['./hull-nav-bar.component.scss'],
})
export class HullNavBarComponent implements OnInit {
  public tabs: { label: string; class: HullType }[] = [];

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    Object.values(HullType)
      .filter((type) => type != HullType.default)
      .forEach((value, index, classes) =>
        this.tabs.push({ label: value, class: classes[index] })
      );
  }

  public onChange($event: MatTabChangeEvent): void {
    const shipClass = this.getShipClass($event.index);
    this.store.dispatch(
      NavigationActions.SetShipClass({ hullType: shipClass })
    );
  }

  private getShipClass(index: number): HullType {
    return this.tabs[index].class;
  }
}
