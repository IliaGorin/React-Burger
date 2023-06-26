import { sendRequest } from './index';
import { Ingredient } from '../../utils/Types/data';
import { AppThunk, AppDispatch } from '../../utils/Types';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
  'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' =
  'GET_INGREDIENTS_FAILED';

export type GetIngredients = {
  readonly type: typeof GET_INGREDIENTS;
  ingredientsLoading?: boolean;
  ingredientsRequestFailed?: boolean;
};

export type GetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  data: Array<Ingredient> | null;
  ingredientsLoading?: boolean;
  ingredientsRequestFailed?: boolean;
};

export type GetIngredientsError = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  ingredientsLoading?: boolean;
  ingredientsRequestFailed?: boolean;
};

export type GetIngredientsActions =
  | GetIngredients
  | GetIngredientsSuccess
  | GetIngredientsError;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS,
  });
  sendRequest(`/ingredients`)
    .then((res) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        error: err.message,
      });
    });
};
