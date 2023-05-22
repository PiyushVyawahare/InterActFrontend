import React from 'react';
import { Provider } from 'react-redux';
// import store from './store/store.js';
import store from './store/store';
// import './app.scss';
import {AppRouter} from './modules/common/index'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;