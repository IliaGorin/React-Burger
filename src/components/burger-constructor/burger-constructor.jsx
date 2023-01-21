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

import { postOrder } from '../../services/actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  addBunToConstructor,
} from '../../services/actions/index.js';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const orderNumber = useSelector((store) => store.order.order);

  const [isOrderModalVis, setOrderModalVis] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const closeOrderModal = () => {
    setOrderModalVis(false);
  };

  const ingredientsData = useSelector((store) => store.ingredients.data);

  // const bun = {};

  // for (let key in ingredientsData[0]) {
  //   bun[key] = ingredientsData[0][key];
  // }

  // useEffect(() => {
  //   dispatch(addBunToConstructor(bun));
  // }, []);

  // const ingredientsForCurrentBurger = ingredientsData.filter(
  //   (ingredient) => ingredient.type !== 'bun' && ingredient.type !== ''
  // );

  const ingredientsForCurrentBurger = useSelector(
    (store) => store.inConstructor.ingredients
  );

  const bun = useSelector((store) => store.inConstructor.bun);

  const orderedIngredients = [];

  // useEffect(() => {
  //   orderedIngredients.push(bun._id);
  //   for (const ingredient of ingredientsForCurrentBurger) {
  //     orderedIngredients.push(ingredient._id);
  //   }
  //   orderedIngredients.push(bun._id);
  // }, [ingredientsForCurrentBurger]);

  let currentPrice = 0;

  if (bun && ingredientsForCurrentBurger.length) {
    currentPrice =
      bun.price * 2 +
      ingredientsForCurrentBurger.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      );
  }

  // useEffect(() => {
  //   const currentPrice =
  //     Bun.price * 2 +
  //     ingredientsForCurrentBurger.reduce(
  //       (sum, ingredient) => sum + ingredient.price,
  //       0
  //     );
  //   setTotalPrice(currentPrice);
  // }, [Bun.price, ingredientsForCurrentBurger]);

  const makeOrder = (orderedIngredients) => {
    dispatch(postOrder(orderedIngredients));
  };

  // const bunForCurrentBurger = useSelector((store) => store.inConstructor.bun);

  // useEffect(() => {
  //   for (let key in bun) {
  //     bun[key] = bunForCurrentBurger[key];
  //   }
  // }, [bunForCurrentBurger]);

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

  return (
    <section
      className={`${stylesForBurgerConstructor.constructorSection} mt-25 ml-4 mr-4`}
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
      <ul className={`${stylesForBurgerConstructor.list}`} ref={dropRef}>
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
        {ingredientsForCurrentBurger.map((ingredient) => (
          <li
            key={ingredient.keyId}
            className={`${stylesForBurgerConstructor.listItem} mb-4`}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
              handleClose={() => deleteItem(ingredient.keyId)}
            />
          </li>
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
      {/* <div className={`${stylesForBurgerConstructor.checkWrapper} mt-10`}>
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
              makeOrder(orderedIngredients);
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </div> */}
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
              makeOrder(orderedIngredients);
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
