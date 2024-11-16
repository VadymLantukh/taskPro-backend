export const getDate = () => {
  const currentDate = new Date();
  const dateWithoutTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  return dateWithoutTime;
};
