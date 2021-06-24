const addItem=(data)=>{
    return(dispatch)=>{
        dispatch({
            type:'addItem',
            item:data
        })
    }
}

const removeItem=(data)=>{
    return(dispatch)=>{
        dispatch({
            type:'removeItem',
            item:data
        })
    }
}

export default {addItem,removeItem};