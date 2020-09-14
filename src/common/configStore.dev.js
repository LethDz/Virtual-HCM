import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import { rootReducer } from "src/reducer";

const configStore = () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(loggerMiddleware))
  );

  return store;
};

export default configStore;
