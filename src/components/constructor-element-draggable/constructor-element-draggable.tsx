import React, { useRef, FC } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from 'react-dnd';
import styles from './constructor-element-draggable.module.css';
import { useDispatch } from 'react-redux';
import { reorderConstructor } from '../../services/actions/ingr-in-constructor-actions';
import PropTypes from 'prop-types';

const ConstructorElementDraggable: FC = ({
  id,
  index,
  text,
  price,
  thumbnail,
  handleKey,
  ...props
}) => {
  const dispatch = useDispatch();

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
        handleClose={() => props.handleClose(handleKey)}
      />
    </li>
  );
};

ConstructorElementDraggable.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default ConstructorElementDraggable;
