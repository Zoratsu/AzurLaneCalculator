import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  EquipmentType,
  IEquipment,
  IEquipmentTier,
  IEquipmentTiers,
  Rarity,
  Stars,
} from '@app/models/equipment';
import { Nation } from '@app/models/nation';
import { UtilService } from '@app/services/util.service';
import { AppState } from '@app/store';
import { EquipmentActions } from '@app/store/actions/equipment.action';
import { selectEquipmentActive } from '@app/store/selectors/equipment.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gun-item',
  templateUrl: './gun-item.component.html',
  styleUrls: ['./gun-item.component.scss'],
})
export class GunItemComponent implements OnInit, OnDestroy {
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
    let newManual: IEquipment;
    let newTier: IEquipmentTier;
    if (this.equipment && this.tier) {
      newManual = {
        ...this.equipment,
        absoluteCooldown: this.utilService.reverseValue(form.cooldown),
      };
      newTier = this.createTier(form, this.tier);
    } else {
      newManual = {
        id: 'Manual',
        name: 'Manual',
        type: EquipmentType.default,
        nation: Nation.default,
        absoluteCooldown: this.utilService.reverseValue(form.cooldown),
        tiers: this.createTiers(form),
        image: 'no-image.png',
      };
      newTier = this.createTier(form);
    }
    this.store.dispatch(
      EquipmentActions.SetActiveEquipment({ equipment: newManual })
    );
    this.store.dispatch(EquipmentActions.SetActiveTier({ tier: newTier }));
    this.store.dispatch(EquipmentActions.ProcessActive());
    this.snackBar.open('Updated Stats', 'Ok', { duration: 2000 });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      firepower: this.fb.control(0, Validators.required),
      antiAir: this.fb.control(0, Validators.required),
      bulletNumber: this.fb.control(0, Validators.required),
      bulletDmg: this.fb.control(0, Validators.required),
      coefficient: this.fb.control(0, Validators.required),
      cooldown: this.fb.control(0, Validators.required),
      volleyTime: this.fb.control(0, Validators.required),
      reload: this.fb.control(0, Validators.required),
      light: this.fb.control(0, Validators.required),
      medium: this.fb.control(0, Validators.required),
      heavy: this.fb.control(0, Validators.required),
    });
  }

  private loadForm(): void {
    this.gunForm.reset({
      firepower: this.tier?.firepower,
      antiAir: this.tier?.antiAir,
      bulletNumber: this.tier?.damage.multiplier,
      bulletDmg: this.tier?.damage.value,
      coefficient: this.utilService.getPercentage(this.tier?.coefficient),
      cooldown: this.utilService.getValue(this.equipment?.absoluteCooldown),
      volleyTime: this.utilService.getValue(this.tier?.volleyTime),
      reload: this.utilService.getValue(this.tier?.rateOfFire),
      light: this.utilService.getPercentage(this.tier?.ammoType?.light),
      medium: this.utilService.getPercentage(this.tier?.ammoType?.medium),
      heavy: this.utilService.getPercentage(this.tier?.ammoType?.heavy),
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

  private createTiers(form: any): IEquipmentTiers {
    return { t0: this.createTier(form) };
  }

  private createTier(form: any, tier?: IEquipmentTier): IEquipmentTier {
    if (tier) {
      return {
        ...tier,
        firepower: this.utilService.reverseValue(form.firepower),
        antiAir: this.utilService.reverseValue(form.antiAir),
        damage: {
          value: this.utilService.reverseValue(form.bulletDmg),
          multiplier: this.utilService.reverseValue(form.bulletNumber),
        },
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
    } else {
      return {
        rarity: Rarity.default,
        stars: Stars.default,
        damage: { value: form.bulletDmg, multiplier: form.bulletNumber },
        antiAir: this.utilService.reverseValue(form.antiAir),
        torpedo: 0,
        aviation: 0,
        firepower: this.utilService.reverseValue(form.firepower),
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
