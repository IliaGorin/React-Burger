import React, { FC } from 'react';
import stylesForIngredientDetails from './ingredient-details.module.css';
import { Ingredient } from '../../utils/Types/data';

const IngredientDetails: FC<{ item: Ingredient }> = ({ item }) => {
  return (
    <>
      {item && (
        <div className={`${stylesForIngredientDetails.wrapper}`}>
          <img
            className={`${stylesForIngredientDetails.image} mb-4`}
            src={item.image_large}
            alt={item.name}
          />
          <p className="text text_type_main-medium">{item.name}</p>
          <ul
            className={`text text_type_main-default text_color_inactive ${stylesForIngredientDetails.nutrients} mt-8`}
          >
            <li className={stylesForIngredientDetails.nutrient}>
              <p>Калории,ккал</p>
              <p className="text text_type_digits-default">{item.calories}</p>
            </li>
            <li className={`${stylesForIngredientDetails.nutrient} ml-5`}>
              <p>Белки, г</p>
              <p className="text text_type_digits-default">{item.proteins}</p>
            </li>
            <li className={`${stylesForIngredientDetails.nutrient} ml-5`}>
              <p>Жиры, г</p>
              <p className="text text_type_digits-default">{item.fat}</p>
            </li>
            <li className={`${stylesForIngredientDetails.nutrient} ml-5`}>
              <p>Углеводы, г</p>
              <p className="text text_type_digits-default">
                {item.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default IngredientDetails;
