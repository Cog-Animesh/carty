import { combineReducers } from "redux";
import CartReducer from './CartReducer';

const CombineReducer = combineReducers({
    cartReducer:CartReducer
})

export default CombineReducer;