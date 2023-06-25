import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  TypedUseSelectorHook,
} from 'react-redux';
import { RootState } from '../..';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { BrowsedIngredientActions } from '../../services/actions/browsed-ingredient-actions';
import { GetIngredientsActions } from '../../services/actions/get-ingredients-actions';
import { IngredientInConstructorActions } from '../../services/actions/ingr-in-constructor-actions';
import { PostOrderActions } from '../../services/actions/post-order-actions';
import { UserActions } from '../../services/actions/users';
import { WsActions } from '../../services/actions/ws-actions';

export type ApplicationActions =
  | BrowsedIngredientActions
  | GetIngredientsActions
  | IngredientInConstructorActions
  | PostOrderActions
  | UserActions
  | WsActions;

export type AppDispatch = ThunkDispatch<RootState, never, ApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ApplicationActions
>;
