import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SlotID } from '@app/models/ship';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ship-calculation-home',
  templateUrl: './ship-calculation-home.component.html',
  styleUrls: ['./ship-calculation-home.component.scss'],
})
export class ShipCalculationHomeComponent implements OnInit, OnDestroy {
  @Input()
  private slotId?: SlotID;

  private ngUnsubscribe = new Subject();

  public constructor() {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get primary() {
    return SlotID.primary;
  }

  get secondary() {
    return SlotID.secondary;
  }

  get tertiary() {
    return SlotID.tertiary;
  }
}
