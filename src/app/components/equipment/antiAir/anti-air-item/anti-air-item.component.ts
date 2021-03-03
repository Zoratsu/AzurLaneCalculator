import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  IEquipment,
  IEquipmentTier,
  IEquipmentTiers,
  Rarity,
  Stars,
} from '@app/models/equipment';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import { selectEquipmentActive } from '@app/store/selectors/equipment.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-anti-air-item',
  templateUrl: './anti-air-item.component.html',
  styleUrls: ['./anti-air-item.component.scss'],
})
export class AntiAirItemComponent implements OnInit, OnDestroy {
  public equipment?: IEquipment;
  public tier?: IEquipmentTier;
  public gunForm: FormGroup;

  private ngUnsubscribe = new Subject();

  public constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private utilService: UtilService
  ) {
    this.gunForm = this.buildForm();
  }

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSubmit(): void {
    const form = this.gunForm.getRawValue();
    let newTier: IEquipmentTier;
    if (this.equipment && this.tier) {
      newTier = this.createTier(form, this.tier);
    } else {
      newTier = this.createTier(form);
    }
    this.store.dispatch(EquipmentActions.SetActiveTier({ tier: newTier }));
    this.snackBar.open('Updated Stats', 'Ok', { duration: 2000 });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      firepower: this.fb.control(0, Validators.required),
      antiAir: this.fb.control(0, Validators.required),
      damage: this.fb.control(0, Validators.required),
      coefficient: this.fb.control(0, Validators.required),
      reload: this.fb.control(0, Validators.required),
    });
  }

  private loadForm(): void {
    this.gunForm.reset({
      firepower: this.utilService.getValue(this.tier?.firepower),
      antiAir: this.utilService.getValue(this.tier?.antiAir),
      damage: this.utilService.getValue(this.tier?.damage?.value),
      coefficient: this.utilService.getPercentage(this.tier?.coefficient),
      reload: this.utilService.getValue(this.tier?.rateOfFire),
    });
  }

  private loadSubscription(): void {
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.equipment = active.equipment;
        this.tier = active.tier;
        this.loadForm();
      });
  }

  private createTier(form: any, tier?: IEquipmentTier): IEquipmentTier {
    if (tier) {
      return {
        ...tier,
        firepower: this.utilService.reverseValue(form.firepower),
        antiAir: this.utilService.reverseValue(form.antiAir),
        coefficient: this.utilService.reversePercentage(form.coefficient),
        damage: {
          value: this.utilService.reverseValue(form.damage),
          multiplier: 1,
        },
        rateOfFire: this.utilService.reverseValue(form.reload),
      };
    } else {
      return {
        rarity: Rarity.default,
        stars: Stars.default,
        damage: { value: form.bulletDmg, multiplier: form.bulletNumber },
        antiAir: this.utilService.reverseValue(form.antiAir),
        torpedo: 0,
        aviation: 0,
        firepower: 0,
        rateOfFire: this.utilService.reverseValue(form.reload),
        volleyTime: this.utilService.reverseValue(form.volleyTime),
        coefficient: this.utilService.reversePercentage(form.coefficient),
        ammoType: {
          name: 'Manual',
          light: this.utilService.reversePercentage(form.light),
          medium: this.utilService.reversePercentage(form.medium),
          heavy: this.utilService.reversePercentage(form.heavy),
        },
      };
    }
  }
}
