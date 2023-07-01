import React, { forwardRef, FC } from 'react';
import classes from './ingredient-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
// import { useSelector } from 'react-redux';
import { useSelector } from '../../utils/Types';

type BurgerIngredientType = {
  category: string;
  categoryType: string;
  id: string;
};

const IngredientCategory = forwardRef<HTMLLIElement, BurgerIngredientType>(
  (props, ref) => {
    const { categoryType, id, category } = props;
    const ingredients = useSelector((store) => store.ingredients.data);

    const ingredientsForRender = ingredients
      ? ingredients.filter((data) => data.type === categoryType)
      : null;

    return (
      ingredientsForRender && (
        <li ref={ref} id={id}>
          <h3
            className={`${classes.typeHeader} text text_type_main-medium`}
            id={categoryType}
          >
            {category}
          </h3>
          <ul className={classes.ingredientsByType}>
            {ingredientsForRender.map((ingredient) => (
              <li key={ingredient._id}>
                <BurgerIngredient data={ingredient} />
              </li>
            ))}
          </ul>
        </li>
      )
    );
  }
);

export default IngredientCategory;
