import axios from "axios";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";

function Cart(props) {
    //let [cartList, setCartList] = useState([]);
    //let cartList=[];
    //console.log(cartList)
    const removeItem = () => {

    }

    const addItem = () => {

    }

    useEffect(() => {
        // axios.get(`/cart/read/${JSON.parse(localStorage.getItem('user')).username}`)
        //     .then(res => {
        //         console.log(res.data)
        //         setCartList(res.data.products ? res.data.products : [])
        //         console.log(props)
        //         props.cnt(cartList.length)
        //     })
        //     .catch(err => console.log(err))
       // setCartList(props.cartList)
    }, [])
    return (
        <div className="mt-5">
            {
                props.cartList.length === 0 ?
                    <h1>Cart is Empty</h1> :
                    props.cartList.map((ele, ind) => {
                        return (<div>
                            <CartItem key={ind} data={ele}></CartItem>
                        </div>)
                    })
            }
        </div>
    )
}

export default Cart;