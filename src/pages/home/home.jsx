import { React } from 'react';

import styles from './home.module.css';

import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

function HomePage() {
  const ingredients = useSelector((store) => store.ingredients.data);

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
