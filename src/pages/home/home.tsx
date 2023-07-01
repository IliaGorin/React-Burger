import { FC } from 'react';

import styles from './home.module.css';

// import { useSelector } from 'react-redux';
import { useSelector } from '../../utils/Types';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

const HomePage: FC = () => {
  const ingredients = useSelector((store) => store.ingredients.data);

  return (
    <>
      {ingredients?.length && (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.mainGrid}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      )}
    </>
  );
};

export default HomePage;
