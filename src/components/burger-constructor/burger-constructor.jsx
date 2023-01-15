import { React, useEffect, useState, useContext } from 'react';
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

function BurgerConstructor() {
  const dispatch = useDispatch();
  const orderNumber = useSelector((store) => store.order.order);

  const [isOrderModalVis, setOrderModalVis] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const closeOrderModal = () => {
    setOrderModalVis(false);
  };

  const ingredientsData = useSelector((store) => store.ingredients.data);

  const topBun = ingredientsData[0];
  const bottomBun = ingredientsData[0];
  const ingredientsForCurrentBurger = ingredientsData.filter(
    (igredient) => igredient.type !== 'bun' && igredient.type !== ''
  );

  const orderedIngredients = [];

  useEffect(() => {
    orderedIngredients.push(topBun._id);
    for (const ingredient of ingredientsForCurrentBurger) {
      orderedIngredients.push(ingredient._id);
    }
    orderedIngredients.push(bottomBun._id);
  }, [ingredientsForCurrentBurger]);

  useEffect(() => {
    const currentPrice =
      topBun.price +
      bottomBun.price +
      ingredientsForCurrentBurger.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      );
    setTotalPrice(currentPrice);
  }, [topBun.price, bottomBun.price, ingredientsForCurrentBurger]);

  const makeOrder = (orderedIngredients) => {
    dispatch(postOrder(orderedIngredients));
  };

  return (
    <section
      className={`${stylesForBurgerConstructor.constructorSection} mt-25 ml-4 mr-4`}
    >
      <div className={`ml-8`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${topBun.name} (верх)`}
          price={topBun.price}
          thumbnail={topBun.image}
        />
      </div>
      <ul className={`${stylesForBurgerConstructor.list}`}>
        {ingredientsForCurrentBurger.map((ingredient) => (
          <li
            key={ingredient._id}
            className={`${stylesForBurgerConstructor.listItem} mb-4`}
          >
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>
      <div className={`ml-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bottomBun.name} (низ)`}
          price={bottomBun.price}
          thumbnail={bottomBun.image}
        />
      </div>
      <div className={`${stylesForBurgerConstructor.checkWrapper} mt-10`}>
        <div className={`${stylesForBurgerConstructor.checkSummary}`}>
          <p className={`text text_type_digits-medium mr-2`}>{totalPrice}</p>
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
      </div>
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
