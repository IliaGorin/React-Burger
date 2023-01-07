import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { typeOfingredient } from '../../utils/propTypes.js';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredients from './burger-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient.jsx';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import IngredientCategory from '../ingredient-category/ingredient-category.jsx';

function BurgerIngredients(props) {
  const [current, setCurrent] = useState('bun');

  const [isModalIngredientOpen, setModalIngredientOpen] = useState(false);

  const [selectedIngredient, setSelectedIngredient] = useState({});

  const openModalIngredient = (item) => {
    setSelectedIngredient(item);
    setModalIngredientOpen(true);
  };

  const closeModalIngredient = () => {
    setModalIngredientOpen(false);
  };

  return (
    <section>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <div className={`${stylesForBurgeringredients.tabs}`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={stylesForBurgeringredients.ingredientsList}>
        <IngredientCategory
          openModalIngredient={openModalIngredient}
          ingredients={props.data}
          category={'Булки'}
          categoryType={'bun'}
        />
        <IngredientCategory
          openModalIngredient={openModalIngredient}
          ingredients={props.data}
          category={'Соусы'}
          categoryType={'sauce'}
        />
        <IngredientCategory
          openModalIngredient={openModalIngredient}
          ingredients={props.data}
          category={'Начинки'}
          categoryType={'main'}
        />
      </ul>
      <Modal isActive={isModalIngredientOpen} closeModal={closeModalIngredient}>
        <IngredientDetails data={selectedIngredient} />
      </Modal>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(typeOfingredient).isRequired,
};

export default BurgerIngredients;
