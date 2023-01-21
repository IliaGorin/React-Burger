import React, { useEffect, useState, useRef } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from 'react-dnd';
import styles from './constructor-element-draggable.module.css';
import { useDispatch } from 'react-redux';
import { reorderConstructor } from '../../services/actions';

function ConstructorElementDraggable(props) {
  const dispatch = useDispatch();
  const id = props.id;
  const index = props.index;
  const ref = useRef();

  const [, drop] = useDrop(() => ({
    accept: 'sortingIgredients',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(reorderConstructor({ dragIndex, hoverIndex }));

      item.index = hoverIndex;
    },
  }));

  const [{ isDragging }, drag] = useDrag({
    type: 'sortingIgredients',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={
        isDragging
          ? `${styles.listItem} mb-4 ${styles.isDragging}`
          : `${styles.listItem} mb-4`
      }
    >
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
