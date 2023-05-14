import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';
import Modal from '../../components/modal/modal';
import { closeIngredientDetails } from '../../services/actions/browsed-ingredient-actions';
import HomePage from '../home/home';
import { useNavigate } from 'react-router-dom';

export const IngredientPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.data);
  const { id } = useParams();
  const selectedItem = ingredients.find((item) => item._id === id);
  // useEffect(() => {
  //   console.log(selectedItem);
  // }, [selectedItem]);
  const isModalIngredientOpen = useSelector(
    (store) => store.openCard.browsedIngredient
  );
  const closeModal = () => {
    dispatch(closeIngredientDetails());
    navigate(-1);
  };

  return (
    <main className={styles.wrapper}>
      {/* <h1 className="text_type_main-large">Детали ингредиента</h1>
      <IngredientDetails item={selectedItem} /> */}
      {isModalIngredientOpen ? (
        <>
          <HomePage />
          <Modal closeModal={closeModal} title="Детали ингредиента">
            <IngredientDetails item={selectedItem} />
          </Modal>
        </>
      ) : (
        <>
          <h1 className="text_type_main-large">Детали ингредиента</h1>
          <IngredientDetails item={selectedItem} />
        </>
      )}
    </main>
  );
};
