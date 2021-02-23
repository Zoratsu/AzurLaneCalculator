import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentType, Rarity, Stars } from '@app/models/equipment';
import { IGun, IGunTier, IGunTiers } from '@app/models/gun';
import { Nation } from '@app/models/nation';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { selectGunActive } from '@app/store/selectors/gun.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gun-item',
  templateUrl: './gun-item.component.html',
  styleUrls: ['./gun-item.component.scss'],
})
export class GunItemComponent implements OnInit, OnDestroy {
  public gun?: IGun;
  public tier?: IGunTier;
  public gunForm: FormGroup;

  private ngUnsubscribe = new Subject();

  public constructor(private fb: FormBuilder, private store: Store<AppState>) {
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
    let newManual: IGun;
    let newTier: IGunTier;
    if (this.gun && this.tier) {
      newManual = {
        ...this.gun,
        absoluteCooldown: this.reverseValue(form.cooldown),
      };
      newTier = this.createTier(form, this.tier);
    } else {
      newManual = {
        name: 'Manual',
        type: EquipmentType.default,
        nation: Nation.default,
        absoluteCooldown: this.reverseValue(form.cooldown),
        tiers: this.createTiers(form),
        image: 'no-image.png',
      };
      newTier = this.createTier(form);
    }
    this.store.dispatch(GunActions.SetActiveGun({ gun: newManual }));
    this.store.dispatch(GunActions.SetActiveTier({ tier: newTier }));
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      firepower: this.fb.control('0', Validators.required),
      antiAir: this.fb.control('0', Validators.required),
      bulletNumber: this.fb.control('0', Validators.required),
      bulletDmg: this.fb.control('0', Validators.required),
      coefficient: this.fb.control('0', Validators.required),
      cooldown: this.fb.control('0', Validators.required),
      volleyTime: this.fb.control('0', Validators.required),
      reload: this.fb.control('0', Validators.required),
      light: this.fb.control('0', Validators.required),
      medium: this.fb.control('0', Validators.required),
      heavy: this.fb.control('0', Validators.required),
    });
  }

  private loadForm(): void {
    this.gunForm.reset({
      firepower: this.tier?.firepower,
      antiAir: this.tier?.antiAir,
      bulletNumber: this.tier?.damage.multiplier,
      bulletDmg: this.tier?.damage.value,
      coefficient: this.getPercentage(this.tier?.coefficient),
      cooldown: this.getValue(this.gun?.absoluteCooldown),
      volleyTime: this.getValue(this.tier?.volleyTime),
      reload: this.getValue(this.tier?.rateOfFire),
      light: this.getPercentage(this.tier?.ammoType.light),
      medium: this.getPercentage(this.tier?.ammoType.medium),
      heavy: this.getPercentage(this.tier?.ammoType.heavy),
    });
  }

  private loadSubscription(): void {
    this.store
      .select(selectGunActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((active) => {
        this.gun = active.gun;
        this.tier = active.tier;
        this.loadForm();
      });
  }

  private getPercentage(value?: number): number {
    if (value) {
      return Math.round(value * 100 * 100) / 100;
    } else {
      return 0;
    }
  }

  private getValue(value?: number): number {
    if (value) {
      return Math.round(value * 100) / 100;
    } else {
      return 0;
    }
  }

  private reversePercentage(value?: string): number {
    if (value) {
      return Number(value) / 100;
    } else {
      return 0;
    }
  }

  private reverseValue(value?: string): number {
    if (value) {
      return Number(value);
    } else {
      return 0;
    }
  }

  private createTiers(form: any): IGunTiers {
    return { t0: this.createTier(form) };
  }

  private createTier(form: any, tier?: IGunTier): IGunTier {
    if (tier) {
      return {
        ...tier,
        firepower: this.reverseValue(form.firepower),
        antiAir: this.reverseValue(form.antiAir),
        damage: {
          value: this.reverseValue(form.bulletDmg),
          multiplier: this.reverseValue(form.bulletNumber),
        },
        rateOfFire: this.reverseValue(form.reload),
        volleyTime: this.reverseValue(form.volleyTime),
        coefficient: this.reversePercentage(form.coefficient),
        ammoType: {
          name: 'Manual',
          light: this.reversePercentage(form.light),
          medium: this.reversePercentage(form.medium),
          heavy: this.reversePercentage(form.heavy),
        },
      };
    } else {
      return {
        rarity: Rarity.default,
        stars: Stars.default,
        damage: { value: form.bulletDmg, multiplier: form.bulletNumber },
        antiAir: 0,
        rateOfFire: this.reverseValue(form.reload),
        firepower: 0,
        volleyTime: this.reverseValue(form.volleyTime),
        coefficient: this.reversePercentage(form.coefficient),
        ammoType: {
          name: 'Manual',
          light: this.reversePercentage(form.light),
          medium: this.reversePercentage(form.medium),
          heavy: this.reversePercentage(form.heavy),
        },
      };
    }
  }
}
