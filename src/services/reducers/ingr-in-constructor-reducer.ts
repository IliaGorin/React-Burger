import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  REORDER_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
} from '../actions/ingr-in-constructor-actions';
import { IngredientInConstructorActions } from '../actions/ingr-in-constructor-actions';
import { Ingredient } from '../../utils/Types/data';

type State = {
  ingredients: Array<Ingredient>;
  bun: null | Ingredient;
};

const initialState: State = {
  ingredients: [],
  bun: null,
};

export const ingredientsInConstructorReducer = (
  state = initialState,
  action: IngredientInConstructorActions
): State => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          { ...action.data, keyId: action.keyId },
        ],
      };
    }
    case ADD_BUN_TO_CONSTRUCTOR:
      return {
        ...state,
        bun: action.data,
      };
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient: Ingredient) => {
          return ingredient.keyId !== action.data;
        }),
      };
    }
    case REORDER_CONSTRUCTOR: {
      const copyArr = [...state.ingredients];
      copyArr.splice(
        action.data.hoverIndex,
        0,
        copyArr.splice(action.data.dragIndex, 1)[0]
      );
      return {
        ...state,
        ingredients: [...copyArr],
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: [],
        bun: null,
      };
    }

    default:
      return state;
  }
};
