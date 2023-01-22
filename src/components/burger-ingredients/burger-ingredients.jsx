import { React, useEffect, useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredients from './burger-ingredients.module.css';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import IngredientCategory from '../ingredient-category/ingredient-category.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { closeIngredientDetails } from '../../services/actions/browsed-ingredient-actions';

function BurgerIngredients() {
  const [current, setCurrent] = useState('bun');
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
        entry.target.id === 'bun' && setBunActive(entry.isIntersecting);
        entry.target.id === 'sauce' && setSauceActive(entry.isIntersecting);
        entry.target.id === 'main' && setMainActive(entry.isIntersecting);
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
    bunActive && setCurrent('bun');
    !bunActive && sauceActive && setCurrent('sauce');
    !sauceActive && mainActive && setCurrent('main');
  }, [bunActive, sauceActive, mainActive]);

  const categories = [
    { categoryType: 'bun', category: 'Булки', ref: bunsRef, id: 'bun' },
    { categoryType: 'sauce', category: 'Соусы', ref: saucesRef, id: 'sauce' },
    { categoryType: 'main', category: 'Начинки', ref: mainRef, id: 'main' },
  ];

  return (
    <section>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
      <div className={`${stylesForBurgeringredients.tabs}`}>
        {categories.map((category) => {
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
        {categories.map((category) => (
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
        <Modal closeModal={() => dispatch(closeIngredientDetails())}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
