import React from 'react';
import ReactDOM from 'react-dom';

// setup react-redux
import { Provider } from 'react-redux';
import { configStore } from 'src/common/configStore';

import 'src/index.css';
import App from 'src/App';
import * as serviceWorker from 'src/serviceWorker';
import { rootReducer } from 'src/reducer';

const store = configStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
