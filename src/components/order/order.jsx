import styles from './order.module.css';
import DayOfOrder from './day-of-order';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

function Order(props) {
  // const { id } = useParams();
  // const order = props.data.find((element) => element._id === id);
  // useEffect(() => {
  //   console.log('order in order', props.data);
  // }, []);

  const { name, createdAt, number } = props.data;

  return (
    <main>
      <div className={styles.empty}>
        <p className={`text text_type_digits-default ${styles.empty}`}>
          {name}, {createdAt}, {number}
        </p>
        <DayOfOrder createdAt={createdAt} />
      </div>
    </main>
  );
}

export default Order;
