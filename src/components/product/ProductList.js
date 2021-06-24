import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreator from "../../store/ActionCreator";
import Product from "./Product";

function ProductList() {
    let [productItem, setProductItem] = useState({ arr: [] });
    const store = useSelector(store => store.cartReducer);
    console.log('cartReducer ',store);
    const dispatch = useDispatch();
    const {addItem,removeItem} = bindActionCreators(ActionCreator,dispatch);

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
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        :
                        productItem.arr.map((ele, ind) => {
                            return (<div className="col">
                                <Product key={ind} data={ele} addItem={addItem} removeItem={removeItem}></Product>
                            </div>)
                        })

                }
            </div>

        </div>
    )
}

export default ProductList;