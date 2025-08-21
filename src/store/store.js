import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { toyReducer } from "./reducers/toy.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"
import { systemReducer } from "./reducers/system.reducer.js"
// import { userReducer } from "./reducers/user.reducer.js"

// const { createStore, compose, combineReducers } = Redux

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    systemModule: systemReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })