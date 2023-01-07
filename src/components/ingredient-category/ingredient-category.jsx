import classes from './ingredient-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { typeOfingredient } from '../../utils/propTypes.js';

function IngredientCategory(props) {
  return (
    <li>
      <h3 className={`${classes.typeHeader} text text_type_main-medium`}>
        {props.category}
      </h3>
      <ul className={classes.ingredientsByType}>
        {props.ingredients
          .filter((data) => data.type === props.categoryType)
          .map((ingredient) => (
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
}

BurgerIngredient.propTypes = {
  data: typeOfingredient.isRequired,
};

export default IngredientCategory;
