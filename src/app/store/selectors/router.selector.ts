import { AppState } from '@app/store';
import { createSelector } from '@ngrx/store';

export const selectRouter = (state: AppState) => state.router;

export const selectRouterUrl = createSelector(
  selectRouter,
  (router) => router?.state.url
);
