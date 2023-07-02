import React, { useRef, FC } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag, DropTargetMonitor } from 'react-dnd';
import styles from './constructor-element-draggable.module.css';
// import { useDispatch } from 'react-redux';
import { useDispatch } from '../../utils/Types';
import { reorderConstructor } from '../../services/actions/ingr-in-constructor-actions';

const ConstructorElementDraggable: FC<{
  id: string | undefined;
  index: number;
  text: string;
  price: number;
  thumbnail: string;
  handleKey: string;
  handleClose: (item: string) => void;
}> = ({ id, index, text, price, thumbnail, handleKey, handleClose }) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'sortingIgredients',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop(() => ({
    accept: 'sortingIgredients',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (
      item: { index: number; type: string; id: string },
      monitor: DropTargetMonitor
    ) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      if (!hoverBoundingRect || !clientOffset) return;

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
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

  drag(drop(ref));

  return (
    <li
      key={id}
      ref={ref}
      className={
        isDragging
          ? `${styles.listItem} mb-4 ${styles.isDragging}`
          : `${styles.listItem} mb-4`
      }
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={() => handleClose(handleKey)}
      />
    </li>
  );
};

export default ConstructorElementDraggable;
