import { React, useEffect } from 'react';

import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { AppHeader } from '../app-header/app-header';

import { getIngredients } from '../../services/actions/index';
import { useDispatch, useSelector } from 'react-redux';

import IngredientsDataContext from '../../services/ingredients-data-context';

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
        <IngredientsDataContext.Provider value={ingredients}>
          <main className={appStyles.mainGrid}>
            <BurgerIngredients data={ingredients} />
            <BurgerConstructor data={ingredients} />
          </main>
        </IngredientsDataContext.Provider>
      )}
    </>
  );
}

export default App;
