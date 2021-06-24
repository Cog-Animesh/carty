const CartReducer = (state = [], action) => {
    let item = action.item;
    let flag = true;
    if (action.type === 'addItem') {
        state.forEach((ele,ind) => {
            if (ele.pid === item.pid) {
                ele.qty += 1;
                state.splice(ind,1,ele);
            state = [...state.slice(0,ind),ele,...state.slice(ind+1)]  
            flag=false         
         }
        })
        if(flag){
            return [...state, item]
        }
    }
    else if (action.type === 'removeItem') {

    }
    return state;
}

export default CartReducer;