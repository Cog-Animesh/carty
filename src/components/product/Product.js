import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Product(props) {
    let item = props.data;
    let [role, setRole] = useState(null)


    useEffect(() => {
        if (localStorage.role) {
            setRole(localStorage.role)
        }
    })

    function isUser() {
        return role === 'user' ? true : false;
    }

    function isAdmin() {
        return role === 'admin' ? true : false;
    }

    return (

        <div className="card m-2 p-2 card-product">
            <img src={item.image} class="card-img-top" alt="..." height="200" width="100" />
            <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Price:{item.price}</p>
                    </div>
                    <div className="d-flex flex-column">
                        {isUser() && <button className="btn btn-success" onClick={() => props.addItem(item)}>Add to Cart</button>}
                        {isAdmin() && <button className="btn btn-danger">Delete</button>}
                        {isAdmin() && <button className="btn btn-outline-danger mt-2">Edit</button>}
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Product;