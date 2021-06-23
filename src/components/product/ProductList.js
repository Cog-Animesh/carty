import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Product from "./Product";

function ProductList() {
    let [productItem, setProductItem] = useState({ arr: [] });

    useEffect(() => {
        axios.get("/product/read")
            .then(products => {
                console.log(products.data)
                console.log(Array.isArray(products.data))
                let ar = products.data
                console.log(ar)

                console.log(productItem.arr)
                setProductItem({ arr: ar })
                console.log(productItem)
                console.log(productItem.arr)


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
                                <Product key={ind} data={ele}></Product>
                            </div>)
                        })

                }
            </div>

        </div>
    )
}

export default ProductList;