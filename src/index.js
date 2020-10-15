import React from 'react';
import ReactDOM from 'react-dom';

// setup react-redux
import { Provider } from 'react-redux';
import { configStore } from 'src/common/configStore';

import 'src/index.css';
import App from 'src/App';
import * as serviceWorker from 'src/serviceWorker';
import { rootReducer } from 'src/reducer';
import ErrorBoundary from 'src/common/ErrorBoundary';

const store = configStore(rootReducer);

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
