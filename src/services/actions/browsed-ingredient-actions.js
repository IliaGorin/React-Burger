export const BROWSED_INGREDIENT = 'BROWSED_INGREDIENT';
export const CLEAR_BROWSED_INGREDIENT = 'CLEAR_BROWSED_INGREDIENT';

export const openIngredientDetails = (ingredient) => {
  return {
    type: BROWSED_INGREDIENT,
    data: ingredient,
  };
};

export const closeIngredientDetails = () => {
  return {
    type: CLEAR_BROWSED_INGREDIENT,
  };
};
