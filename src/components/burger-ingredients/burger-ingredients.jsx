import { React, useEffect, useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredients from './burger-ingredients.module.css';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import IngredientCategory from '../ingredient-category/ingredient-category.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { closeIngredientDetails } from '../../services/actions/browsed-ingredient-actions';
import { BUN, SAUCE, MAIN } from '../../utils/constants';

function BurgerIngredients() {
  const [current, setCurrent] = useState(BUN);
  const [bunActive, setBunActive] = useState(false);
  const [sauceActive, setSauceActive] = useState(false);
  const [mainActive, setMainActive] = useState(false);
  const dispatch = useDispatch();
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainRef = useRef(null);

  const isModalIngredientOpen = useSelector(
    (store) => store.openCard.browsedIngredient
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.id === BUN && setBunActive(entry.isIntersecting);
        entry.target.id === SAUCE && setSauceActive(entry.isIntersecting);
        entry.target.id === MAIN && setMainActive(entry.isIntersecting);
      });
    });
    bunsRef.current !== null && observer.observe(bunsRef.current);
    saucesRef.current !== null && observer.observe(saucesRef.current);
    mainRef.current !== null && observer.observe(mainRef.current);
  }, []);

  const onTabClick = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    bunActive && setCurrent(BUN);
    !bunActive && sauceActive && setCurrent(SAUCE);
    !sauceActive && mainActive && setCurrent(MAIN);
  }, [bunActive, sauceActive, mainActive]);

  const CATEGORIES = [
    { categoryType: 'bun', category: 'Булки', ref: bunsRef, id: BUN },
    {
      categoryType: SAUCE,
      category: 'Соусы',
      ref: saucesRef,
      id: SAUCE,
    },
    {
      categoryType: MAIN,
      category: 'Начинки',
      ref: mainRef,
      id: MAIN,
    },
  ];

  return (
    <section>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <div className={`${stylesForBurgeringredients.tabs}`}>
        {CATEGORIES.map((category) => {
          return (
            <Tab
              value={category.categoryType}
              active={current === category.categoryType}
              onClick={onTabClick}
              key={category.id}
            >
              {category.category}
            </Tab>
          );
        })}
      </div>
      <ul className={stylesForBurgeringredients.ingredientsList}>
        {CATEGORIES.map((category) => (
          <IngredientCategory
            category={category.category}
            categoryType={category.categoryType}
            ref={category.ref}
            id={category.id}
            key={category.id}
          />
        ))}
      </ul>
      {isModalIngredientOpen && (
        <Modal
          closeModal={() => dispatch(closeIngredientDetails())}
          title="Детали ингредиента"
        >
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
