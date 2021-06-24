import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRouteMatch } from "react-router-dom";
import {Switch, Link, Route } from 'react-router-dom';
import AddProduct from "./product/AddProduct";
import ProductList from "./product/ProductList";
import Cart from './Cart'

function UserProfile(props) {
    let [user, setUser] = useState('');
    let { path, url } = useRouteMatch();
    let [role, setRole] = useState(null)
  
    useEffect(() => {
        if (localStorage.role) {
            setRole(localStorage.role)
          }
        console.log(props)
        props.setLoginStatus(true);
        let userObj = JSON.parse(localStorage.getItem('user'))
        setUser({ ...userObj });
        console.log(userObj)
    }, [])

    function isUser() {
        return role === 'user' ? false : true;
    }

    function isAdmin() {
        return role === 'admin' ? false : true;
    }

    return (
        <div>
            <div>Welcome {user.username} </div>
            <div>
                <div className="d-flex justify-content-around">
                    <div className="nav-item ms-4" hidden={isAdmin()}>
                        <Link className="nav-link fs-5" to={`${url}/addproduct`}>Add Product</Link>
                    </div>
                    <div className="nav-item ms-4" hidden={isUser()}>
                        <Link className="nav-link fs-5" to={`${url}/cart`}>Cart</Link>
                    </div>
                    <div className="nav-item">
                        <Link className="nav-link fs-5" to={`${url}/productlist`}>Product List</Link>
                    </div>
                </div>
                <Switch>
                    <Route path={`${path}/addproduct`}>
                        <AddProduct />
                    </Route>
                    <Route path={`${path}/productlist`}>
                        <ProductList />
                    </Route>
                    <Route path={`${path}/cart`}>
                        <Cart />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default UserProfile;