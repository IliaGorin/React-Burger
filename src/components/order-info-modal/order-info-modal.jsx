import styles from './order-info-modal.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import DayOfOrder from '../day-of-order/day-of-order';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

function OrderInfoModal(props) {
  // const { id } = useParams();
  // const order = props.data.find((element) => element._id === id);
  // useEffect(() => {
  //   console.log('order in order', props.data);
  // }, []);
  const allIngredients = useSelector((store) => store.ingredients.data);
  const { name, createdAt, number, ingredients, status } = props.data;

  const orderIngredients = useMemo(
    () =>
      ingredients
        .filter((id) => id !== null)
        .map((id) => allIngredients.find((item) => id === item._id)),
    [ingredients, allIngredients]
  );
  const priceScore = useMemo(() => {
    return orderIngredients.reduce((acc, element) => acc + element.price, 0);
  }, [orderIngredients]);

  const counter = 1;

  return (
    <main className={`${styles.orderWrapper} mr-2`}>
      <p
        className={`text text_type_digits-default ${styles.title}`}
      >{`#${number}`}</p>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{name}</h2>
      {status === 'done' ? (
        <p
          className="text text_type_main-default"
          style={{ color: '#00CCCC', marginTop: '-16px' }}
        >
          Выполнен
        </p>
      ) : null}
      <p className={`text text_type_main-medium ${styles.title}`}>Состав:</p>
      <div className={styles.orderDetails}>
        <ul className={styles.ingredientsList}>
          {orderIngredients &&
            orderIngredients.map((element) => {
              return (
                <li className={styles.list} key={uuid4()}>
                  {element && (
                    <>
                      <div className={styles.imageWrapper}>
                        <div className={styles.imageStyler}>
                          <img
                            className={styles.image}
                            src={element.image}
                            alt={element.alt}
                          />
                        </div>
                      </div>
                      <p
                        className="text text_type_main-default"
                        style={{ marginRight: 'auto' }}
                      >
                        {element.name}
                      </p>
                      <div className={styles.price}>
                        <p
                          className={`text text_type_digits-default ${styles.title}`}
                        >
                          {`${counter} x ${element.price}`}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
      <div className={styles.footer}>
        <DayOfOrder createdAt={createdAt} />
        <div className={styles.price}>
          <p className={`text text_type_digits-default ${styles.title}`}>
            {priceScore}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </main>
  );
}

export default OrderInfoModal;
