import { Action, ActionCreator, Dispatch } from 'redux';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { BrowsedIngredientActions } from '../../services/actions/browsed-ingredient-actions';
import { GetIngredientsActions } from '../../services/actions/get-ingredients-actions';
import { IngredientInConstructorActions } from '../../services/actions/ingr-in-constructor-actions';
import { PostOrderActions } from '../../services/actions/post-order-actions';
import { WsActions } from '../../services/actions/ws-actions';

import { store } from '../..';

export type ApplicationActions =
  | GetIngredientsActions
  | BrowsedIngredientActions
  | GetIngredientsActions
  | IngredientInConstructorActions
  | PostOrderActions
  | WsActions;

export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
// // export type AppDispatch = Dispatch<ApplicationActions>;

// // export const useDispatch = () => dispatchHook<AppDispatch>();

// // export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// export type AppThunk<ReturnType = void> = ActionCreator<
//   ThunkAction<ReturnType, Action, RootState, ApplicationActions>
// >;

export type AppDispatch = ThunkDispatch<RootState, never, ApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ApplicationActions
>;
