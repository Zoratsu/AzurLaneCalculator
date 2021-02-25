import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SlotID } from '@app/models/ship';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ship-calculation-slot',
  templateUrl: './ship-calculation-slot.component.html',
  styleUrls: ['./ship-calculation-slot.component.scss'],
})
export class ShipCalculationSlotComponent implements OnInit, OnDestroy {
  @Input()
  public slotId?: SlotID;
  public calculationForm: FormGroup;

  private ngUnsubscribe = new Subject();

  public constructor(private fb: FormBuilder) {
    this.calculationForm = this.buildForm();
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      cooldown: this.fb.control(0),
      raw: this.fb.control(0),
      light: this.fb.control(0),
      medium: this.fb.control(0),
      heavy: this.fb.control(0),
    });
  }

  get exists(): boolean {
    return this.slotId === SlotID.primary || this.slotId === SlotID.secondary;
  }
  get moreThanRaw(): boolean {
    return this.slotId === SlotID.primary;
  }
}
