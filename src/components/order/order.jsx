import styles from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import DayOfOrder from './day-of-order';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

function Order(props) {
  // const { id } = useParams();
  // const order = props.data.find((element) => element._id === id);
  // useEffect(() => {
  //   console.log('order in order', props.data);
  // }, []);
  const allIngredients = useSelector((store) => store.ingredients.data);
  const { name, createdAt, number, ingredients } = props.data;
  const orderLength = ingredients.length;
  const notShownIngredientsCount = orderLength - 6;

  const orderIngredients = useMemo(
    () =>
      ingredients
        .filter((id) => id !== null)
        .map((id) => allIngredients.find((item) => id === item._id)),
    [ingredients, allIngredients]
  );
  const priceScore = useMemo(() => {
    return orderIngredients.reduce((acc, element) => acc + element.price, 0);
  }, [allIngredients]);
  useEffect(() => {
    console.log(orderIngredients);
  }, []);
  return (
    <main className={`${styles.orderWrapper} mr-2`}>
      <div className={styles.info}>
        <p
          className={`text text_type_digits-default ${styles.title}`}
        >{`#${number}`}</p>
        <DayOfOrder createdAt={createdAt} />
      </div>
      <h2 className={`text text_type_main-medium ${styles.title}`}>{name}</h2>
      <div className={styles.orderDetails}>
        <ul className={styles.ingredientsList}>
          {orderIngredients &&
            orderLength <= 6 &&
            orderIngredients.map((element) => {
              return (
                <li className={styles.list} key={uuid4()}>
                  {element && (
                    <div className={styles.imageWrapper}>
                      <div className={styles.imageStyler}>
                        <img
                          className={styles.image}
                          src={element.image}
                          alt={element.alt}
                        />
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          {orderIngredients &&
            orderLength > 6 &&
            orderIngredients.slice(5, 6).map((element) => {
              return (
                <li className={styles.list} key={uuid4()}>
                  <p
                    className={`text text_type_main-default ${styles.disabled_count}`}
                  >{`+${notShownIngredientsCount}`}</p>
                  <div className={styles.disabledImg}>
                    {element && (
                      <div className={styles.imageWrapper}>
                        <div className={styles.imageStyler}>
                          <img
                            className={styles.image}
                            src={element.image}
                            alt={element.alt}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          {orderIngredients &&
            orderLength > 6 &&
            orderIngredients.slice(0, 5).map((element) => {
              return (
                <li className={styles.list} key={uuid4()}>
                  {element && (
                    <div className={styles.imageWrapper}>
                      <div className={styles.imageStyler}>
                        <img
                          className={styles.image}
                          src={element.image}
                          alt={element.alt}
                        />
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
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

export default Order;
