import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IShip } from '@app/models/ship';
import { AppState } from '@app/store';
import { ShipActions } from '@app/store/actions/ship.actions';
import { selectGunActive } from '@app/store/selectors/gun.selector';
import { selectShipActive } from '@app/store/selectors/ship.selector';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
})
export class ShipComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  public ship?: IShip;
  public shipForm: FormGroup;

  public constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.shipForm = this.buildForm();
  }

  public ngOnInit(): void {
    this.loadSubscription();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onSubmit(): void {
    console.log(this.ship);
    if (this.ship) {
      const form = this.shipForm.getRawValue();
      let ship: IShip = {
        ...this.ship,
        firepower: this.reverseValue(form.firepower),
        reload: this.reverseValue(form.reload),
        slotEfficiency: this.reversePercentage(form.efficiency),
        buff: {
          firepower: this.reversePercentage(form.firepowerBuff),
          reload: this.reversePercentage(form.reloadBuff),
          damage: this.reversePercentage(form.damageBuff),
        },
      };
      this.store.dispatch(ShipActions.SetActive({ ship }));
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      firepower: this.fb.control('100'),
      reload: this.fb.control('100'),
      efficiency: this.fb.control('100'),
      damageBuff: this.fb.control('0'),
      reloadBuff: this.fb.control('0'),
      firepowerBuff: this.fb.control('0'),
    });
  }

  private loadForm(): void {
    this.shipForm.reset({
      firepower: this.ship?.firepower,
      reload: this.ship?.reload,
      efficiency: this.getPercentage(this.ship?.slotEfficiency),
      damageBuff: this.getPercentage(this.ship?.buff.damage),
      reloadBuff: this.getPercentage(this.ship?.buff.reload),
      firepowerBuff: this.getPercentage(this.ship?.buff.firepower),
    });
  }

  private loadSubscription(): void {
    this.store
      .select(selectShipActive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((ship) => {
        this.ship = ship;
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
}
