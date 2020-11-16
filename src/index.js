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
import { ChatWidget } from 'src/modules/chat';
import { history } from 'src/common/history';
import { ADMIN_PAGE, CONTRIBUTOR_PAGE } from 'src/constants';

const store = configStore(rootReducer);

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);

const renderChatWidget = () => {
  const pathname = window.location.pathname;
  if (pathname.includes(ADMIN_PAGE) || pathname.includes(CONTRIBUTOR_PAGE)) {
    ReactDOM.render(<ChatWidget />, document.getElementById('chat-widget'));
  }

  history.listen((location) => {
    if (
      location.pathname.includes(ADMIN_PAGE) ||
      location.pathname.includes(CONTRIBUTOR_PAGE)
    ) {
      ReactDOM.render(<ChatWidget />, document.getElementById('chat-widget'));
    } else {
      ReactDOM.unmountComponentAtNode(document.getElementById('chat-widget'));
    }
  });
};

renderChatWidget();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
