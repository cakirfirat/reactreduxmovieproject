import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware} from "redux";
import reduxPromise from 'redux-promise-middleware'
import thunk from "redux-thunk";
import rootReducer from './reducers/rootReducer'
import {composeWithDevTools} from "redux-devtools-extension";
import {logger} from "redux-logger/src";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(reduxPromise,thunk,logger)
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
