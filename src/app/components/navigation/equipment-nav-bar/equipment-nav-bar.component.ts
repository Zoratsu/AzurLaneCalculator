import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { EquipmentType } from '@app/models/equipment';
import { AppState } from '@app/store';
import { NavigationActions } from '@app/store/actions/navigation.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-equipment-nav-bar',
  templateUrl: './equipment-nav-bar.component.html',
  styleUrls: ['./equipment-nav-bar.component.scss'],
})
export class EquipmentNavBarComponent implements OnInit {
  public tabs: { label: string; type: EquipmentType }[] = [];

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    Object.values(EquipmentType)
      .filter((type) => type != EquipmentType.default)
      .forEach((value, index, types) =>
        this.tabs.push({ label: value, type: types[index] })
      );
  }

  public onChange($event: MatTabChangeEvent): void {
    const equipmentType = this.getEquipmentType($event.index);
    this.store.dispatch(NavigationActions.SetEquipmentType({ equipmentType }));
  }

  private getEquipmentType(index: number): EquipmentType {
    return this.tabs[index].type;
  }
}
