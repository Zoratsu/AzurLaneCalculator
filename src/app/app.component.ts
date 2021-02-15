import { Component } from '@angular/core';
import { guns } from '@app/database/guns';
import { AppState } from '@app/store';
import { GunActions } from '@app/store/actions/gun.action';
import { selectGunIsActive } from '@app/store/selectors/gun.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isActive: boolean = false;

  public constructor(private store: Store<AppState>) {
    //this.store.dispatch(GunActions.LoadArray());
    this.store.dispatch(GunActions.SetActive({ gun: guns[0] }));
    this.store
      .select(selectGunIsActive)
      .subscribe((isActive) => (this.isActive = isActive));
  }
}
