import { React, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { typeOfingredient } from '../../utils/propTypes.js';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgerConstructor from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import {
  postOrder,
  clearOrder,
} from '../../services/actions/post-order-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  addBunToConstructor,
} from '../../services/actions/ingr-in-constructor-actions';
import ConstructorElementDraggable from '../constructor-element-draggable/constructor-element-draggable.jsx';
import { BUN } from '../../utils/constants.js';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const orderNumber = useSelector((store) => store.order.order);
  const { isLoggedIn } = useSelector((store) => store.users);

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const ingredientsForCurrentBurger = useSelector(
    (store) => store.inConstructor.ingredients
  );
  const bun = useSelector((store) => store.inConstructor.bun);

  const currentPrice = useMemo(() => {
    return (
      ingredientsForCurrentBurger.length > 0 &&
      bun &&
      bun.price * 2 +
        ingredientsForCurrentBurger.reduce(
          (sum, ingredient) => sum + ingredient.price,
          0
        )
    );
  }, [ingredientsForCurrentBurger, bun]);

  const makeOrder = (orderedIngredients) => {
    dispatch(postOrder(orderedIngredients));
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type !== BUN) {
        dispatch(addIngredientToConstructor(item));
      } else if (item.type === BUN) {
        dispatch(addBunToConstructor(item));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const deleteItem = (item) => {
    dispatch(removeIngredientFromConstructor(item));
  };

  const [, dragRef] = useDrag({
    type: 'ingredient',
  });

  const bunRender = (type, name) => {
    return (
      <div className={`ml-8`}>
        <ConstructorElement
          type={type}
          isLocked={true}
          text={`${bun.name} (${name})`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    );
  };

  return (
    <section
      className={`${stylesForBurgerConstructor.constructorSection} mt-25 ml-4 mr-4`}
      ref={dropRef}
    >
      {bun ? (
        bunRender('top', 'верх')
      ) : (
        <div className={'text text_type_main-default'}>Добавьте булку</div>
      )}
      <ul className={`${stylesForBurgerConstructor.list}`}>
        {!ingredientsForCurrentBurger.length && (
          <li
            key={'invite'}
            className={`${stylesForBurgerConstructor.listItem} mb-4`}
          >
            <div className={'text text_type_main-default'}>
              Добавьте элементы вашего бургера...
            </div>
          </li>
        )}
        {ingredientsForCurrentBurger.map((ingredient, index) => (
          <ConstructorElementDraggable
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={deleteItem}
            handleKey={ingredient.keyId}
            index={index}
            key={ingredient.keyId}
            id={ingredient.keyId}
          />
        ))}
      </ul>
      {bun ? (
        bunRender('bottom', 'низ')
      ) : (
        <div className={'text text_type_main-default'}>Добавьте булку</div>
      )}
      {ingredientsForCurrentBurger.length >= 1 && bun ? (
        <div className={`${stylesForBurgerConstructor.checkSummary}`}>
          <p className={`text text_type_digits-medium mr-2`}>{currentPrice}</p>
          <CurrencyIcon type="primary" />
          <span className={`text text_type_digits-medium ml-10`}></span>

          {isLoggedIn ? (
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={() => {
                makeOrder(ingredientsForCurrentBurger);
              }}
            >
              Оформить заказ
            </Button>
          ) : (
            <Button htmlType="button" type="primary" disabled>
              Оформить заказ
            </Button>
          )}
        </div>
      ) : (
        <div className={'text text_type_main-default'}>
          Для оформления заказа выберите булку и ингредиенты
        </div>
      )}

      {orderNumber && (
        <Modal closeModal={closeOrderModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
