import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from "src/reducer";

const configStore = () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware())
  );

  return store;
};

export default configStore;
