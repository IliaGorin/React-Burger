import React from 'react';
import stylesForOrderDetails from './order-details.module.css';
import PropTypes from 'prop-types';
import imageOrderDone from '../../images/done.svg';

const OrderDetails = () => {
  return (
    <div className={`${stylesForOrderDetails.orderDetailsWrapper}`}>
      <p
        className={`${stylesForOrderDetails.orderNumber} text text_type_digits-large mt-20 mb-8`}
      >
        034536
      </p>
      <p className="text text_type_main-medium text_color_primary ">
        идентификатор заказа
      </p>
      <img
        className={`${stylesForOrderDetails.orderDetailsIcon} mt-15 mb-15`}
        src={imageOrderDone}
        alt="alt"
      />
      <p className="text text_type_main-default text_color_primary">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
