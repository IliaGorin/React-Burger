import { React, useEffect, useState } from 'react';
import appStyles from './app.module.css';
import { URL_API } from '../../utils/constants';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { AppHeader } from '../app-header/app-header';

import IngredientsDataContext from '../../services/ingredients-data-context';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch(`${URL_API}ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => setIngredients(res.data))
      .catch((err) => console.error(err));
  }, []);

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
