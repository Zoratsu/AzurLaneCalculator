import { IEquipmentState } from '@app/models/equipmentStore';
import { NavigationState } from '@app/models/navitagionStore';
import { ShipState } from '@app/models/shipStore';
import { EquipmentEffects } from '@app/store/effects/equipment.effects';
import { ShipEffects } from '@app/store/effects/ship.effects';
import { navigationReducer } from '@app/store/reducers/navigation.reducer';
import { shipReducer } from '@app/store/reducers/ship.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { equipmentReducer } from './reducers/equipment.reducer';

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
