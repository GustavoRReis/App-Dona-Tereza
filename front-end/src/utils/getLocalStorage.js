const getLocalStorage = (user) => {
  JSON.parse(localStorage.getItem(user));
};

export default getLocalStorage;
