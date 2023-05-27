import styles from './order.module.css';
import { useEffect } from 'react';

function Order(props) {
  return (
    <main>
      <div>Заказ № {props.id}</div>
    </main>
  );
}

export default Order;
