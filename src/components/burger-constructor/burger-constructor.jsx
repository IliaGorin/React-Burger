import { React, useEffect, useState } from 'react';
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

function BurgerConstructor(props) {
  const [isOrderModalVis, setOrderModalVis] = useState(false);
  const closeOrderModal = () => {
    setOrderModalVis(false);
  };

  return (
    <section
      className={`${stylesForBurgerConstructor.constructorSection} mt-25 ml-4 mr-4`}
    >
      <div className={`ml-8`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={props.data[0].image}
        />
      </div>
      <ul className={`${stylesForBurgerConstructor.list}`}>
        {props.data
          .filter((igredient) => igredient.type !== 'bun')
          .map((ingredient) => (
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
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={props.data[0].image}
        />
      </div>
      <div className={`${stylesForBurgerConstructor.checkWrapper} mt-10`}>
        <div className={`${stylesForBurgerConstructor.checkSummary}`}>
          <p className={`text text_type_digits-medium mr-2`}>610</p>
          <CurrencyIcon type="primary" />
          <span className={`text text_type_digits-medium ml-10`}></span>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => {
              setOrderModalVis(true);
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      <Modal isActive={isOrderModalVis} closeModal={closeOrderModal}>
        <OrderDetails closeModal={closeOrderModal} />
      </Modal>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(typeOfingredient).isRequired,
};

export default BurgerConstructor;
