import React, { forwardRef } from 'react';
import classes from './ingredient-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { typeOfingredient } from '../../utils/propTypes.js';
import { useSelector } from 'react-redux';

const IngredientCategory = forwardRef((props, ref) => {
  const ingredients = useSelector((store) => store.ingredients.data);
  const ingredientsForRender = ingredients.filter(
    (data) => data.type === props.categoryType
  );

  return (
    <li ref={ref} id={props.id}>
      <h3
        className={`${classes.typeHeader} text text_type_main-medium`}
        id={props.categoryType}
      >
        {props.category}
      </h3>
      <ul className={classes.ingredientsByType}>
        {ingredientsForRender.map((ingredient) => (
          <li key={ingredient._id}>
            <BurgerIngredient
              data={ingredient}
              openModalIngredient={props.openModalIngredient}
              id={ingredient._id}
            />
          </li>
        ))}
      </ul>
    </li>
  );
});

BurgerIngredient.propTypes = {
  data: typeOfingredient.isRequired,
};

export default IngredientCategory;
