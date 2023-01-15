import { React, useEffect } from 'react';

import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { AppHeader } from '../app-header/app-header';

import { getIngredients } from '../../services/actions/index';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.data);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {ingredients.length && (
        <main className={appStyles.mainGrid}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
    </>
  );
}

export default App;
