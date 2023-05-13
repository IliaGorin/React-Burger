import { React, useEffect } from 'react';

import styles from './home.module.css';

import { getIngredients } from '../../services/actions/get-ingredients-actions';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

function HomePage() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.data);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      {ingredients.length && (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.mainGrid}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      )}
    </>
  );
}

export default HomePage;
