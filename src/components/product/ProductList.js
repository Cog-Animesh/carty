import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import ActionCreator from "../../store/ActionCreator";
import Product from "./Product";

function ProductList(props) {
    let [productItem, setProductItem] = useState({ arr: [] });
    let [cartItemState, setCartItemState] = useState([]);
    let history  = useHistory();

    const dispatch = useDispatch();
    const { addItem, removeItem } = bindActionCreators(ActionCreator, dispatch);

    const addItemInCart = (obj) => {
        // obj.qty = 1;
        // let flag = true;
        let username = JSON.parse(localStorage.getItem('user')).username;
        console.log(obj)
        // cartItemState.arr.forEach((ele, ind) => {
        //     if (ele.pid === obj.pid) {
        //         ele.qty += 1;
        //         cartItemState.arr.splice(ind, 1, ele);
        //         cartItemState.arr = [...cartItemState.arr.slice(0, ind), ele, ...cartItemState.arr.slice(ind + 1)]
        //         flag = false;
        //     }
        // })
        // if(flag){
        //     setCartItemState({arr:[...cartItemState.arr,obj]})
        // }
        // console.log(cartItemState)
        axios.post('/cart/add', { username: username, products: obj })
            .then(function (res) {
                if (res.data.status === "success") {
                    console.log(JSON.stringify(res.data.data))
                    //setCartItemState([...cartItemState,obj])
                   // console.log(cartItemState)
                   props.cnt(ds => ds+1)
                   alert(res.data.message)
                   history.push('/userprofile/cart')
                }
            })
    }

    const removeItemInCart = () => {

    }

    useEffect(() => {
        axios.get("/product/read")
            .then(products => {
                let ar = products.data
                setProductItem({ arr: ar })
            })
            .catch(err => console.log(err.message))
    }, [])

    return (
        <div className="container">
            <div className="row row-cols-md-3">
                {
                    productItem.arr.length === 0 ?
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        :
                        productItem.arr.map((ele, ind) => {
                            return (<div className="col">
                                <Product key={ind} data={ele} addItem={addItemInCart} removeItem={removeItemInCart}></Product>
                            </div>)
                        })

                }
            </div>

        </div>
    )
}

export default ProductList;