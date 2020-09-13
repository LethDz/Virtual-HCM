import { createStore, applyMiddleware, compose } from 'redux';

const configStore = (initialState, middleWares = []) => {
  const store = createStore(
    initialState,
    compose(applyMiddleware(...middleWares))
  );

  return store;
};

export default configStore;
