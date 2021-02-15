import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IGun } from '@app/models/gun';
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
        bullet: {
          ...this.gun.bullet,
          number: form.bulletNumber,
          damage: form.bulletDmg,
          ammo: {
            ...this.gun.bullet.ammo,
            light: this.reversePercentage(form.light),
            medium: this.reversePercentage(form.medium),
            heavy: this.reversePercentage(form.heavy),
          },
        },
        coefficient: this.reversePercentage(form.coefficient),
        volleyTime: this.reverseSecond(form.volleyTime),
        reload: this.reverseSecond(form.reload),
        class: {
          ...this.gun.class,
          absoluteCooldown: this.reverseSecond(form.cooldown),
        },
      };
      this.store.dispatch(GunActions.SetActive({ gun: newManual }));
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
      bulletNumber: this.gun?.bullet.number,
      bulletDmg: this.gun?.bullet.damage,
      coefficient: this.getPercentage(this.gun?.coefficient),
      cooldown: this.getSecond(this.gun?.class.absoluteCooldown),
      volleyTime: this.getSecond(this.gun?.volleyTime),
      reload: this.getSecond(this.gun?.reload),
      light: this.getPercentage(this.gun?.bullet.ammo.light),
      medium: this.getPercentage(this.gun?.bullet.ammo.medium),
      heavy: this.getPercentage(this.gun?.bullet.ammo.heavy),
    });
  }

  private loadSubscription(): void {
    this.store
      .select(selectGunActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((gun) => {
        this.gun = gun;
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
}
