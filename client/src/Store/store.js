import { reusingStateReduceer } from "./resusableStore";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from 'redux-logger'; // it is used to console the redux state



const rootReducer = combineReducers({
    reusingState : reusingStateReduceer
});


const storeToolKit = configureStore({ reducer: rootReducer, middleware: [logger] })


export default storeToolKit