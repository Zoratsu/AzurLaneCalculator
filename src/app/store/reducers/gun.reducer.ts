import { IGun, IGunCalculation, IGunTier } from '@app/models/gun';
import { createReducer, on } from '@ngrx/store';
import { GunActions } from '../actions/gun.action';

export interface IGunActive {
  gun?: IGun;
  tier?: IGunTier;
}

export interface IGunState {
  active: IGunActive;
  calculation?: IGunCalculation;
  array: IGun[];
}

const initialState: IGunState = {
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
  on(GunActions.ClearActiveGun, (state) => ({
    ...state,
    active: { ...state.active, gun: initialState.active.gun },
  })),

  on(GunActions.SetActiveTier, (state, { tier }) => ({
    ...state,
    active: { ...state.active, tier },
  })),
  on(GunActions.ClearActiveTier, (state) => ({
    ...state,
    active: { ...state.active, tier: initialState.active.tier },
  })),

  on(GunActions.LoadArray, (state) => ({
    ...state,
    array: [],
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
