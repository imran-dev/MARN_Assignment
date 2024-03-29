import React from 'react';
import ReactDOM from 'react-dom/client';
// import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/soft_ui.css";
import "../src/assets/css/animate.min.css";
import "../src/assets/css/style.css";
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>
);