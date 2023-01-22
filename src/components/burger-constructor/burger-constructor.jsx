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

import { postOrder } from '../../services/actions/post-order-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  addBunToConstructor,
} from '../../services/actions/ingr-in-constructor-actions';
import ConstructorElementDraggable from '../constructor-element-draggable/constructor-element-draggable.js';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const orderNumber = useSelector((store) => store.order.order);
  const [isOrderModalVis, setOrderModalVis] = useState(false);

  const closeOrderModal = () => {
    setOrderModalVis(false);
  };

  const ingredientsForCurrentBurger = useSelector(
    (store) => store.inConstructor.ingredients
  );
  const bun = useSelector((store) => store.inConstructor.bun);
  let currentPrice = 0;

  if (bun && ingredientsForCurrentBurger.length) {
    currentPrice =
      bun.price * 2 +
      ingredientsForCurrentBurger.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      );
  }

  const makeOrder = (orderedIngredients) => {
    dispatch(postOrder(orderedIngredients));
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.type !== 'bun') {
        dispatch(addIngredientToConstructor(item));
      } else if (item.type === 'bun') {
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

  return (
    <section
      className={`${stylesForBurgerConstructor.constructorSection} mt-25 ml-4 mr-4`}
      ref={dropRef}
    >
      {bun ? (
        <div className={`ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
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
        <div className={`ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : (
        <div className={'text text_type_main-default'}>Добавьте булку</div>
      )}
      {ingredientsForCurrentBurger.length >= 1 && bun ? (
        <div className={`${stylesForBurgerConstructor.checkSummary}`}>
          <p className={`text text_type_digits-medium mr-2`}>{currentPrice}</p>
          <CurrencyIcon type="primary" />
          <span className={`text text_type_digits-medium ml-10`}></span>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => {
              setOrderModalVis(true);
              makeOrder(ingredientsForCurrentBurger);
            }}
          >
            Оформить заказ
          </Button>
        </div>
      ) : (
        <div className={'text text_type_main-default'}>
          Для оформления заказа выберите булку и ингредиенты
        </div>
      )}

      {isOrderModalVis && (
        <Modal closeModal={closeOrderModal}>
          <OrderDetails
            closeModal={closeOrderModal}
            orderNumber={orderNumber}
          />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
