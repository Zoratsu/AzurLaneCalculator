import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IGun, IGunTier, IGunTiers } from '@app/models/gun';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { selectGunActive } from '@app/store/selectors/gun.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gun',
  templateUrl: './gun.component.html',
  styleUrls: ['./gun.component.scss'],
})
export class GunComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  public gun?: IGun;
  public tier?: IGunTier;
  public gunForm: FormGroup;

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
    if (this.gun) {
      const form = this.gunForm.getRawValue();
      let newManual: IGun = {
        ...this.gun,
        absoluteCooldown: this.reverseSecond(form.cooldown),
        tiers: this.replaceTiers(this.gun, form),
      };
      this.store.dispatch(GunActions.SetActiveGun({ gun: newManual }));
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      bulletNumber: this.fb.control('0'),
      bulletDmg: this.fb.control('0'),
      coefficient: this.fb.control('0'),
      cooldown: this.fb.control('0'),
      volleyTime: this.fb.control('0'),
      reload: this.fb.control('0'),
      light: this.fb.control('0'),
      medium: this.fb.control('0'),
      heavy: this.fb.control('0'),
    });
  }

  private loadForm(): void {
    this.gunForm.reset({
      bulletNumber: this.tier?.damage.multiplier,
      bulletDmg: this.tier?.damage.value,
      coefficient: this.getPercentage(this.tier?.coefficient),
      cooldown: this.getSecond(this.gun?.absoluteCooldown),
      volleyTime: this.getSecond(this.tier?.volleyTime),
      reload: this.getSecond(this.tier?.rateOfFire),
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

  private getPercentage(value?: number): string {
    if (value) {
      return `${Math.round(value * 100)}`;
    } else {
      return '0';
    }
  }

  private getSecond(value?: number) {
    if (value) {
      return `${Math.round(value * 100) / 100}`;
    } else {
      return '0';
    }
  }

  private reversePercentage(value?: string): number {
    if (value) {
      return Number(value) / 100;
    } else {
      return 0;
    }
  }

  private reverseSecond(value?: string): number {
    if (value) {
      return Number(value);
    } else {
      return 0;
    }
  }

  get isManual(): boolean {
    return this.gun?.name === 'Manual';
  }

  get isReadOnly(): boolean {
    return !this.isManual;
  }

  private replaceTiers(gun: IGun, form: any): IGunTiers {
    if (this.checkTier(gun.tiers?.t0)) {
      return { ...gun.tiers, t0: this.createTier(form, gun.tiers.t0) };
    }
    if (this.checkTier(gun.tiers?.t1)) {
      return { ...gun.tiers, t1: this.createTier(form, gun.tiers.t1) };
    }
    if (this.checkTier(gun.tiers?.t2)) {
      return { ...gun.tiers, t2: this.createTier(form, gun.tiers.t2) };
    }
    if (this.checkTier(gun.tiers?.t3)) {
      return { ...gun.tiers, t3: this.createTier(form, gun.tiers.t3) };
    }
    return gun.tiers;
  }

  private checkTier(tier?: IGunTier): boolean {
    return !!tier && !!this.tier && tier.rarity === this.tier.rarity;
  }

  private createTier(form: any, tier?: IGunTier): IGunTier {
    if (tier)
      return {
        ...tier,
        damage: { value: form.bulletDmg, multiplier: form.bulletNumber },
        rateOfFire: this.reverseSecond(form.reload),
        firepower: form.firepower,
        volleyTime: this.reverseSecond(form.volleyTime),
        coefficient: this.reversePercentage(form.coefficient),
        ammoType: {
          name: 'Manual',
          light: this.reversePercentage(form.light),
          medium: this.reversePercentage(form.medium),
          heavy: this.reversePercentage(form.heavy),
        },
      };
    throw new Error('Invalid State');
  }
}
