import { App } from './components/App';
import React, {Suspense}  from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { store } from './redux/store';
import Loader from './components/Loader';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader/>}>
        <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
