function DayOfOrder({ createdAt }) {
  const currentDay = new Date().getDate();
  const dayOfOrder = createdAt.slice(8, 10);

  return (
    <p className={`text text_type_main-default text_color_inactive`}>
      {dayOfOrder === currentDay ? 'Сегодня' : 'Вчера'},{' '}
      {createdAt.slice(11, 16)} {`i-GMT+3`}
    </p>
  );
}

export default DayOfOrder;
