import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import history from '../views/history'
import { connectRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router'

export default createStore(rootReducer)