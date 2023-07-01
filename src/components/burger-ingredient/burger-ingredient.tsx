import React, { useEffect, useState, FC } from 'react';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredient from './burger-ingredient.module.css';
import { openIngredientDetails } from '../../services/actions/browsed-ingredient-actions';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../../utils/Types/index';
import { useDrag } from 'react-dnd';
import { BUN } from '../../utils/constants';
import { Link, useLocation } from 'react-router-dom';
import { Ingredient } from '../../utils/Types/data';

const BurgerIngredient: FC<{
  data: Ingredient;
}> = ({ data }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: data,
  });
  const ingredientsForCurrentBurger = useSelector(
    (store) => store.inConstructor.ingredients
  );
  const bun = useSelector((store) => store.inConstructor.bun);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (data.type !== BUN) {
      setCounter(
        ingredientsForCurrentBurger.filter((item) => item._id === data._id)
          .length
      );
    }
    if (bun && data.type === BUN && data.name === bun.name) {
      setCounter(2);
    }
    if (bun && data.type === BUN && data.name !== bun.name) {
      setCounter(0);
    }
  }, [ingredientsForCurrentBurger, bun, data.name, data.type, data._id]);

  return (
    <Link
      to={`/ingredients/${data._id}`}
      state={{ background: location }}
      className={stylesForBurgeringredient.link}
      draggable
      ref={dragRef}
    >
      <div
        className={`${stylesForBurgeringredient.ingredientWrap}`}
        onClick={() => dispatch(openIngredientDetails(data))}
      >
        {counter > 0 && (
          <Counter count={counter} size="default" extraClass="m-1" />
        )}
        <img className={`pr-4 pl-4`} src={data.image} alt={data.name} />
        <div
          className={`${stylesForBurgeringredient.ingredientPriceWrap} pt-1 pb-1`}
        >
          <p className={'text text_type_digits-default'}>{data.price}</p>
          <CurrencyIcon type={'primary'} />
        </div>
        <p className={'text text_type_main-default'}>{data.name}</p>
      </div>
    </Link>
  );
};

export default BurgerIngredient;
