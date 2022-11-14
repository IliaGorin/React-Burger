import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { typeOfingredient } from '../../utils/propTypes.js';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredient from './burger-ingredient.module.css';

function BurgerIngredient(props) {
  return (
    <div
      className={`${stylesForBurgeringredient.ingredientWrap}`}
      id={props.data.id}
      onClick={() => props.openModalIngredient(props.data)}
    >
      {props.data.name === 'Краторная булка N-200i' && (
        <Counter count={1} size="default" extraClass="m-1" />
      )}
      {props.data.name === 'Соус традиционный галактический' && (
        <Counter count={1} size="default" extraClass="m-1" />
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
