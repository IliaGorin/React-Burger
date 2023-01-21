import React, { useEffect, useState } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from 'react-dnd';
import styles from './constructor-element-draggable.module.css';

function ConstructorElementDraggable(props) {
  return (
    <li className={`${styles.listItem} mb-4`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.text}
        price={props.price}
        thumbnail={props.thumbnail}
        handleClose={() => props.handleClose(props.handleKey)}
      />
    </li>
  );
}

export default ConstructorElementDraggable;
