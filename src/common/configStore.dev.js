import { createStore, applyMiddleware, compose } from 'redux';
import loggerMiddleware from 'redux-logger';
import { rootReducer } from 'src/reducer';

export const devStore = createStore(
  rootReducer,
  compose(applyMiddleware(loggerMiddleware))
);

const configStore = () => {
  return devStore;
};

export default configStore;
