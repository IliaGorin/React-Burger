import { React, useEffect, useState } from 'react';
import appStyles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { AppHeader } from '../app-header/app-header';
import { getIngredients } from '../../utils/burger-api';

import IngredientsDataContext from '../../services/ingredients-data-context';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients()
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
