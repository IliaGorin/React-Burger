import React, { forwardRef, FC } from 'react';
import classes from './ingredient-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const IngredientCategory = forwardRef((props, ref) => {
  const { categoryType, id, category } = props;
  const ingredients = useSelector((store) => store.ingredients.data);
  const ingredientsForRender = ingredients.filter(
    (data) => data.type === categoryType
  );

  return (
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
            <BurgerIngredient data={ingredient} id={ingredient._id} />
          </li>
        ))}
      </ul>
    </li>
  );
});

IngredientCategory.propTypes = {
  category: PropTypes.string.isRequired,
  categoryType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default IngredientCategory;
