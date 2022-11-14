import React, { useEffect, useState } from 'react';
import stylesForIngredientDetails from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { typeOfingredient } from '../../utils/propTypes';

const IngredientDetails = (props) => {
  return (
    <>
      <h4 className="text text_type_main-large">Детали ингредиента</h4>
      <div className={`${stylesForIngredientDetails.wrapper}`}>
        <img
          className={`${stylesForIngredientDetails.image} mb-4`}
          src={props.data.image_large}
          alt={props.data.name}
        />
        <p className="text text_type_main-medium">{props.data.name}</p>
        <ul
          className={`text text_type_main-default text_color_inactive ${stylesForIngredientDetails.nutrients} mt-8`}
        >
          <li className={stylesForIngredientDetails.nutrient}>
            <p>Калории,ккал</p>
            <p className="text text_type_digits-default">
              {props.data.calories}
            </p>
          </li>
          <li className={`${stylesForIngredientDetails.nutrient} ml-5`}>
            <p>Белки, г</p>
            <p className="text text_type_digits-default">
              {props.data.proteins}
            </p>
          </li>
          <li className={`${stylesForIngredientDetails.nutrient} ml-5`}>
            <p>Жиры, г</p>
            <p className="text text_type_digits-default">{props.data.fat}</p>
          </li>
          <li className={`${stylesForIngredientDetails.nutrient} ml-5`}>
            <p>Углеводы, г</p>
            <p className="text text_type_digits-default">
              {props.data.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default IngredientDetails;
