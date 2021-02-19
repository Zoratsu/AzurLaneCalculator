import { IGun, IGunCalculation, IGunTier } from '@app/models/gun';
import { createReducer, on } from '@ngrx/store';
import { GunActions } from '../actions/gun.action';

export interface GunState {
  active: { gun: IGun | undefined; tier: IGunTier | undefined };
  calculation: IGunCalculation | undefined;
  array: IGun[];
}

const initialState: GunState = {
  active: { gun: undefined, tier: undefined },
  calculation: undefined,
  array: [],
};
export const gunReducer = createReducer(
  initialState,
  on(GunActions.SetActiveGun, (state, { gun }) => ({
    ...state,
    active: { ...state.active, gun },
  })),

  on(GunActions.SetActiveTier, (state, { tier }) => ({
    ...state,
    active: { ...state.active, tier },
  })),

  on(GunActions.LoadArraySuccess, (state, { guns }) => ({
    ...state,
    array: [...guns],
  })),

  on(GunActions.ProcessActiveSuccess, (state, { calculation }) => ({
    ...state,
    calculation: { ...calculation },
  }))
);
