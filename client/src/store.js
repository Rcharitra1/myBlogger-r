import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import primaryReducer from './reducers/index';

const middleware=[thunk];
const initalState={};

const store=createStore(primaryReducer, initalState, 
    compose(applyMiddleware(...middleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;