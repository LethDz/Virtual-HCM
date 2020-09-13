import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';

const configStore = (initialState, middleWares = []) => {
  const store = createStore(
    initialState,
    compose(applyMiddleware(loggerMiddleware, ...middleWares))
  );

  return store;
};

export default configStore;
