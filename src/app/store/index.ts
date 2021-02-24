import { GunEffects } from '@app/store/effects/gun.effects';
import { ShipEffects } from '@app/store/effects/ship.effects';
import {
  navigationReducer,
  NavigationState,
} from '@app/store/reducers/navigation.reducer';
import { shipReducer, ShipState } from '@app/store/reducers/ship.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { gunReducer, IGunState } from './reducers/gun.reducer';

export const effects = [GunEffects, ShipEffects];
export const reducers: ActionReducerMap<AppState> = {
  gun: gunReducer,
  ship: shipReducer,
  navigation: navigationReducer,
  router: routerReducer,
};

export interface AppState {
  gun: IGunState;
  ship: ShipState;
  navigation: NavigationState;
  router: RouterReducerState;
}
