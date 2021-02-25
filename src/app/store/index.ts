import { EquipmentEffects } from '@app/store/effects/equipment.effects';
import { ShipEffects } from '@app/store/effects/ship.effects';
import {
  navigationReducer,
  NavigationState,
} from '@app/store/reducers/navigation.reducer';
import { shipReducer, ShipState } from '@app/store/reducers/ship.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import {
  equipmentReducer,
  IEquipmentState,
} from './reducers/equipment.reducer';

export const effects = [EquipmentEffects, ShipEffects];
export const reducers: ActionReducerMap<AppState> = {
  equipment: equipmentReducer,
  ship: shipReducer,
  navigation: navigationReducer,
  router: routerReducer,
};

export interface AppState {
  equipment: IEquipmentState;
  ship: ShipState;
  navigation: NavigationState;
  router: RouterReducerState;
}
