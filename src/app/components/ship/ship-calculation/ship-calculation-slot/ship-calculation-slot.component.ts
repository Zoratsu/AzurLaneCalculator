import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IShipEquippedSlot, SlotID } from '@app/models/ship';
import { IShipCalculations, IShipCalculationSlot } from '@app/models/shipStore';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { selectShipCalculation } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  private slotCalculation?: IShipCalculationSlot;
  private slotEquipment?: IShipEquippedSlot;

  public constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private utilService: UtilService
  ) {
    this.calculationForm = this.buildForm();
  }

  public ngOnInit(): void {
    this.loadSubscription();
  }

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

  private loadForm(slotCalculation: IShipCalculationSlot): void {
    this.calculationForm.reset({
      cooldown: this.utilService.getValue(slotCalculation.cooldown),
      raw: this.utilService.getValue(slotCalculation.raw),
      light: this.utilService.getValue(slotCalculation.light),
      medium: this.utilService.getValue(slotCalculation.medium),
      heavy: this.utilService.getValue(slotCalculation.heavy),
    });
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipCalculation)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((calculation) => {
        if (calculation) {
          this.getSlotCalculation(calculation);
          this.getSlotEquipment(calculation);
          if (this.slotCalculation) {
            this.loadForm(this.slotCalculation);
          }
        }
      });
  }

  private getSlotCalculation(calculation: IShipCalculations): void {
    switch (this.slotId) {
      case SlotID.primary:
        this.slotCalculation = calculation.shipCalculation.primary;
        break;
      case SlotID.secondary:
        this.slotCalculation = calculation.shipCalculation.secondary;
        break;
      case SlotID.tertiary:
        this.slotCalculation = calculation.shipCalculation.tertiary;
        break;
      default:
        this.slotCalculation = undefined;
    }
  }

  private getSlotEquipment(calculation: IShipCalculations): void {
    switch (this.slotId) {
      case SlotID.primary:
        this.slotEquipment = calculation.shipSlots.primary;
        break;
      case SlotID.secondary:
        this.slotEquipment = calculation.shipSlots.secondary;
        break;
      case SlotID.tertiary:
        this.slotEquipment = calculation.shipSlots.tertiary;
        break;
      default:
        this.slotEquipment = undefined;
    }
  }

  get exists(): boolean {
    return !!this.slotCalculation && !!this.slotEquipment;
  }

  get moreThanRaw(): boolean {
    return (
      !!this.slotCalculation &&
      !!this.slotCalculation.light &&
      !!this.slotCalculation.medium &&
      !!this.slotCalculation.heavy
    );
  }

  get image(): string | undefined {
    return this.slotEquipment?.equipment?.image;
  }

  get name(): string {
    return this.slotEquipment && this.slotEquipment.equipment
      ? this.slotEquipment.equipment.name
      : 'Unknown';
  }

  get type(): string {
    return this.slotEquipment && this.slotEquipment.equipment
      ? this.slotEquipment.equipment.type
      : 'Unknown';
  }
}
