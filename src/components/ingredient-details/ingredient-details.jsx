import React from 'react';
import stylesForIngredientDetails from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
  const ingredient = useSelector((state) => state.openCard.browsedIngredient);
  return (
    <>
      <h4 className="text text_type_main-large">Детали ингредиента</h4>
      <div className={`${stylesForIngredientDetails.wrapper}`}>
        <img
          className={`${stylesForIngredientDetails.image} mb-4`}
          src={ingredient.image_large}
          alt={ingredient.name}
        />
        <p className="text text_type_main-medium">{ingredient.name}</p>
        <ul
          className={`text text_type_main-default text_color_inactive ${stylesForIngredientDetails.nutrients} mt-8`}
        >
          <li className={stylesForIngredientDetails.nutrient}>
            <p>Калории,ккал</p>
            <p className="text text_type_digits-default">
              {ingredient.calories}
            </p>
          </li>
          <li className={`${stylesForIngredientDetails.nutrient} ml-5`}>
            <p>Белки, г</p>
            <p className="text text_type_digits-default">
              {ingredient.proteins}
            </p>
          </li>
          <li className={`${stylesForIngredientDetails.nutrient} ml-5`}>
            <p>Жиры, г</p>
            <p className="text text_type_digits-default">{ingredient.fat}</p>
          </li>
          <li className={`${stylesForIngredientDetails.nutrient} ml-5`}>
            <p>Углеводы, г</p>
            <p className="text text_type_digits-default">
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default IngredientDetails;
