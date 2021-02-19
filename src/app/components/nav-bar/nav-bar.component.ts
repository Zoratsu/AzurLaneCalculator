import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ShipHull } from '@app/models/ship';
import { AppState } from '@app/store';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public tabs: { label: string; class: ShipHull }[] = [];

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    Object.values(ShipHull).forEach((value, index, classes) =>
      this.tabs.push({ label: value, class: classes[index] })
    );
  }

  public onChange($event: MatTabChangeEvent): void {
    const shipClass = this.getShipClass($event.index);
    this.store.dispatch(NavigationActions.SetShipClass({ shipClass }));
  }

  private getShipClass(index: number): ShipHull {
    return this.tabs[index].class;
  }
}
