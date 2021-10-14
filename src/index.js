import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App.jsx';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { Provider } from 'react-redux';

import store from './App/store';

import makeServer from './api/server';

import { BrowserRouter, Route } from "react-router-dom";

import { QueryParamProvider } from "use-query-params";


// if(process.env.NODE_ENV==='development' 
//   && typeof makeServer ==='function'){
//     makeServer();
//   }


if(typeof makeServer ==='function'){
  makeServer();
}

ReactDOM.render(

<React.StrictMode>

    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>

      <Provider store={store}>

        <App />

      </Provider>


      </QueryParamProvider>

    </BrowserRouter>


  </React.StrictMode>
  
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// const alertMessage = document.createElement('div');
// alertMessage.id ='PositionAlertMessage';
// alertMessage.style.position = 'fixed';
// alertMessage.style.zIndex = 999999;
// alertMessage.style.width = '500px';
// alertMessage.style.height = '400px';
// alertMessage.style.top = '60px';
// alertMessage.style.left = '0';
// alertMessage.style.backgroundColor = 'purple';
// alertMessage.style.color = 'white';
// document.body.append(alertMessage);



