import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAmmo } from '@app/models/ammo';
import {
  EquipmentType,
  IEquipment,
  IEquipmentDamage,
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
  selector: 'app-plane-item',
  templateUrl: './plane-item.component.html',
  styleUrls: ['./plane-item.component.scss'],
})
export class PlaneItemComponent implements OnInit, OnDestroy {
  public equipment?: IEquipment;
  public tier?: IEquipmentTier;
  public planeForm: FormGroup;

  public loadList: { damage: IEquipmentDamage; ammo: IAmmo }[] = [];
  public initialLoad?: number;

  private ngUnsubscribe = new Subject();

  public constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private utilService: UtilService
  ) {
    this.planeForm = this.buildForm();
  }

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onChangeLoad($event: MatSelectChange) {
    this.initialLoad = $event.value;
    this.loadForm();
  }

  public onAdd($event: MouseEvent) {
    console.log($event);
  }
  public onClear($event: MouseEvent) {
    console.log($event);
  }

  public onSubmit(): void {
    const form = this.planeForm.getRawValue();
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
    this.snackBar.open('Updated Stats', 'Ok', { duration: 2000 });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      aviation: this.fb.control(0, Validators.required),
      cooldown: this.fb.control(0, Validators.required),
      coefficient: this.fb.control(0, Validators.required),
      reload: this.fb.control(0, Validators.required),
      damage: this.fb.control(0, Validators.required),
      number: this.fb.control(0, Validators.required),
      light: this.fb.control(0, Validators.required),
      medium: this.fb.control(0, Validators.required),
      heavy: this.fb.control(0, Validators.required),
    });
  }

  private loadForm(): void {
    this.planeForm.reset({
      aviation: this.utilService.getValue(this.tier?.aviation),
      cooldown: this.utilService.getValue(this.equipment?.absoluteCooldown),
      coefficient: this.utilService.getPercentage(this.tier?.coefficient),
      reload: this.utilService.getValue(this.tier?.rateOfFire),
      damage: this.utilService.getValue(this.damageValue),
      number: this.utilService.getValue(this.damageMultiplier),
      light: this.utilService.getPercentage(this.ammoLight),
      medium: this.utilService.getPercentage(this.ammoMedium),
      heavy: this.utilService.getPercentage(this.ammoHeavy),
    });
  }

  private loadSubscription(): void {
    this.store
      .select(selectEquipmentActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.equipment = active.equipment;
        this.tier = active.tier;
        this.loadList = [];
        if (active.tier?.damageArray && active.tier.ammoTypeArray) {
          for (let i: number = 0; i < active.tier.damageArray.length; i++) {
            this.loadList.push({
              damage: active.tier.damageArray[i],
              ammo: active.tier.ammoTypeArray[i],
            });
          }
        }
        if (this.loadList.length > 0) {
          this.initialLoad = 0;
        }
        this.loadForm();
      });
  }

  private createTiers(form: any): IEquipmentTiers {
    return { t0: this.createTier(form) };
  }

  private createTier(form: any, tier?: IEquipmentTier): IEquipmentTier {
    if (tier && tier.damageArray && tier.ammoTypeArray) {
      return {
        ...tier,
        aviation: this.utilService.reverseValue(form.aviation),
        damageArray: tier.damageArray.map((item, index) => {
          if (index === this.loadListIndex) {
            return {
              value: this.utilService.reverseValue(form.damage),
              multiplier: this.utilService.reverseValue(form.number),
            };
          } else {
            return item;
          }
        }),
        coefficient: this.utilService.reversePercentage(form.coefficient),
        rateOfFire: this.utilService.reverseValue(form.reload),
        volleyTime: this.utilService.reverseValue(form.volleyTime),
        ammoTypeArray: tier.ammoTypeArray.map((item, index) => {
          if (index === this.loadListIndex) {
            return {
              name: 'Manual',
              light: this.utilService.reversePercentage(form.light),
              medium: this.utilService.reversePercentage(form.medium),
              heavy: this.utilService.reversePercentage(form.heavy),
            };
          } else {
            return item;
          }
        }),
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

  get loadListIndex(): number {
    return this.initialLoad || 0;
  }

  get damageValue(): number {
    return this.tier?.damageArray
      ? this.tier?.damageArray[this.loadListIndex].value
      : 0;
  }
  get damageMultiplier(): number {
    return this.tier?.damageArray
      ? this.tier?.damageArray[this.loadListIndex].multiplier
      : 0;
  }

  get ammoLight(): number {
    return this.tier?.ammoTypeArray
      ? this.tier?.ammoTypeArray[this.loadListIndex].light
      : 0;
  }
  get ammoMedium(): number {
    return this.tier?.ammoTypeArray
      ? this.tier?.ammoTypeArray[this.loadListIndex].medium
      : 0;
  }
  get ammoHeavy(): number {
    return this.tier?.ammoTypeArray
      ? this.tier?.ammoTypeArray[this.loadListIndex].heavy
      : 0;
  }
  get hasBombs(): boolean {
    return !!this.tier?.ammoTypeArray?.length;
  }
}
