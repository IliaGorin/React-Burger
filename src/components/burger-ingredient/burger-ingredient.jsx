import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { typeOfingredient } from '../../utils/propTypes.js';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredient from './burger-ingredient.module.css';
import { openIngredientDetails } from '../../services/actions/browsed-ingredient-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { BUN } from '../../utils/constants.js';

function BurgerIngredient(props) {
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: props.data,
  });
  const ingredientsForCurrentBurger = useSelector(
    (store) => store.inConstructor.ingredients
  );
  const bun = useSelector((store) => store.inConstructor.bun);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (props.data.type !== BUN) {
      setCounter(
        ingredientsForCurrentBurger.filter(
          (item) => item._id === props.data._id
        ).length
      );
    }
    if (bun && props.data.type === BUN && props.data.name === bun.name) {
      setCounter('2');
    }
    if (bun && props.data.type === BUN && props.data.name !== bun.name) {
      setCounter('0');
    }
  }, [ingredientsForCurrentBurger, bun]);

  return (
    <div
      className={`${stylesForBurgeringredient.ingredientWrap}`}
      id={props.data.id}
      onClick={() => dispatch(openIngredientDetails(props.data))}
      draggable
      ref={dragRef}
    >
      {counter > 0 && (
        <Counter count={counter} size="default" extraClass="m-1" />
      )}
      <img
        className={`pr-4 pl-4`}
        src={props.data.image}
        alt={props.data.name}
      />
      <div
        className={`${stylesForBurgeringredient.ingredientPriceWrap} pt-1 pb-1`}
      >
        <p className={'text text_type_digits-default'}>{props.data.price}</p>
        <CurrencyIcon type={'primary'} />
      </div>
      <p className={'text text_type_main-default'}>{props.data.name}</p>
    </div>
  );
}

BurgerIngredient.propTypes = {
  data: typeOfingredient.isRequired,
};

export default BurgerIngredient;
