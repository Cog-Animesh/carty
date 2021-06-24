import { applyMiddleware, createStore } from 'redux';
import CombineReducer from './CombineReducer';
import thunk from 'redux-thunk';

const store = createStore(CombineReducer,applyMiddleware(thunk));

export default store;