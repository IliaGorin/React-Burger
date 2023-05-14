import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';

export const IngredientPage = () => {
  const ingredients = useSelector((store) => store.ingredients.data);
  const { id } = useParams();
  const selectedItem = ingredients.find((item) => item._id === id);
  // useEffect(() => {
  //   console.log(selectedItem);
  // }, [selectedItem]);

  return (
    <main className={styles.wrapper}>
      <h1 className="text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails item={selectedItem} />
    </main>
  );
};
