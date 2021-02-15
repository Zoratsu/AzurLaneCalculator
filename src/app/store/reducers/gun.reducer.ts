import { IGun, IGunCalculation } from '@app/models/gun';
import { createReducer, on } from '@ngrx/store';
import { GunActions } from '../actions/gun.action';

export interface GunState {
  active: IGun | undefined;
  calculation: IGunCalculation | undefined;
  array: IGun[];
}

const initialState: GunState = {
  active: undefined,
  calculation: undefined,
  array: [],
};
export const gunReducer = createReducer(
  initialState,
  on(GunActions.SetActive, (state, { gun }) => ({
    ...state,
    active: {
      ...gun,
    },
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
