import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from 'src/reducer';

export const prodStore = createStore(rootReducer, compose(applyMiddleware()));

const configStore = () => {
  return prodStore;
};

export default configStore;
