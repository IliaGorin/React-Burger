import React, { FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector, useDispatch } from '../../utils/Types';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';
import Modal from '../../components/modal/modal';
import { closeIngredientDetails } from '../../services/actions/browsed-ingredient-actions';
import HomePage from '../home/home';
import { useNavigate } from 'react-router-dom';
import { Ingredient } from '../../utils/Types/data';

export const IngredientPage: FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();
  const ingredients = useSelector(
    (store) => store.ingredients.data
  ) as Array<Ingredient>;
  const { id } = useParams();

  const selectedItem = ingredients.find(
    (item) => item._id === id
  ) as Ingredient;
  const background = location.state && location.state.background;

  const closeModal = () => {
    dispatch(closeIngredientDetails());
    navigate(-1);
  };

  return (
    <>
      {background ? (
        <>
          {background.pathname === '/' ? <HomePage /> : undefined}
          <Modal closeModal={closeModal} title="Детали ингредиента">
            <IngredientDetails item={selectedItem} />
          </Modal>
        </>
      ) : (
        <div className={styles.wrapper}>
          <h1 className="text_type_main-large">Детали ингредиента</h1>
          <IngredientDetails item={selectedItem} />
        </div>
      )}
    </>
  );
};
