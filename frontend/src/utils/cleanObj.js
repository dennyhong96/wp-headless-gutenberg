const cleanObj = (object, ...trashKeys) => {
  return Object.entries(object).reduce(
    (acc, [key, val]) => (trashKeys.includes(key) ? acc : { ...acc, [key]: val }),
    {}
  );
};

export default cleanObj;
