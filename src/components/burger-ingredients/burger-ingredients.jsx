import { React, useEffect, useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredients from './burger-ingredients.module.css';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import IngredientCategory from '../ingredient-category/ingredient-category.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeIngredientDetails,
  openIngredientDetails,
} from '../../services/actions/index';

function BurgerIngredients() {
  const [current, setCurrent] = useState('bun');
  const [bunActive, setBunActive] = useState(false);
  const [sauceActive, setSauceActive] = useState(false);
  const [mainActive, setMainActive] = useState(false);
  const dispatch = useDispatch();
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainRef = useRef(null);

  const isModalIngredientOpen = useSelector((store) => store.openCard.isOpen);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.id === 'bun' && setBunActive(entry.isIntersecting);
        entry.target.id === 'sauce' && setSauceActive(entry.isIntersecting);
        entry.target.id === 'main' && setMainActive(entry.isIntersecting);
      });
    });
    bunsRef.current !== null && observer.observe(bunsRef.current);
    saucesRef.current !== null && observer.observe(saucesRef.current);
    mainRef.current !== null && observer.observe(mainRef.current);
  }, []);

  const openModalIngredient = (item) => {
    dispatch(openIngredientDetails(item));
  };

  const closeModalIngredient = () => {
    dispatch(closeIngredientDetails());
  };

  const onTabClick = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    bunActive && setCurrent('bun');
    !bunActive && sauceActive && setCurrent('sauce');
    !sauceActive && mainActive && setCurrent('main');
  }, [bunActive, sauceActive, mainActive]);

  return (
    <section>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <div className={`${stylesForBurgeringredients.tabs}`}>
        <Tab value="bun" active={current === 'bun'} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <ul className={stylesForBurgeringredients.ingredientsList}>
        <IngredientCategory
          openModalIngredient={openModalIngredient}
          category={'Булки'}
          categoryType={'bun'}
          ref={bunsRef}
          id={'bun'}
        />
        <IngredientCategory
          openModalIngredient={openModalIngredient}
          category={'Соусы'}
          categoryType={'sauce'}
          ref={saucesRef}
          id={'sauce'}
        />
        <IngredientCategory
          openModalIngredient={openModalIngredient}
          category={'Начинки'}
          categoryType={'main'}
          ref={mainRef}
          id={'main'}
        />
      </ul>
      {isModalIngredientOpen && (
        <Modal closeModal={closeModalIngredient}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
