/*
import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import App from "./containers/App";


render( <App />, document.querySelector('.container'));*/
/*import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './containers/App';
import reducers from './reducers/rootReducer';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.querySelector('.container'));*/

import App from './containers/App';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import React from "react";

ReactDOM.render(<App />, document.getElementById('root'));