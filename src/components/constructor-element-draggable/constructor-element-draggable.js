import React, { useEffect, useState } from 'react';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorElementDraggable(props) {
  return (
    <>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.text}
        price={props.price}
        thumbnail={props.thumbnail}
        handleClose={() => props.handleClose(props.handleKey)}
      />
    </>
  );
}

export default ConstructorElementDraggable;
