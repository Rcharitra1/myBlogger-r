import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';

// const middleware=[thunk];
// const initalState={};

// console.log(middleware)

// const store=createStore(rootReducer, initalState, 
//     compose(applyMiddleware(...middleware), 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

// const createStoreWithMiddleware = createStore(
//     rootReducer,
//     compose(
//       applyMiddleware(thunk),
//       window.navigator.userAgent.includes('Chrome') ?
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
//     ),
//   );


const initialState={};

const middleware = [thunk];

const store = createStore(rootReducer,initialState,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()

        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (a)=> a
        )   
    );


export default store;



  


// export default createStoreWithMiddleware;
