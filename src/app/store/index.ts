import { GunEffects } from '@app/store/effects/gun.effects';
import { ShipEffects } from '@app/store/effects/ship.effects';
import { shipReducer, ShipState } from '@app/store/reducers/ship.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { gunReducer, GunState } from './reducers/gun.reducer';

export const effects = [GunEffects, ShipEffects];
export const reducers: ActionReducerMap<AppState> = {
  gun: gunReducer,
  ship: shipReducer,
};

export interface AppState {
  gun: GunState;
  ship: ShipState;
}
