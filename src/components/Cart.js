import axios from "axios";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";

function Cart() {
    let [cartList, setCartList] = useState([]);

    useEffect(() => {
        axios.get(`/cart/read/${JSON.parse(localStorage.getItem('user')).username}`)
            .then(res => {
                console.log(res.data)
                setCartList(res.data.products ? res.data.products : [])
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className="mt-5">
            {
                cartList.length === 0 ?
                    "Cart is Empty" :
                    cartList.map((ele, ind) => {
                        return (<div>
                            <CartItem key={ind} data={ele}></CartItem>
                        </div>)
                    })
            }
        </div>
    )
}

export default Cart;