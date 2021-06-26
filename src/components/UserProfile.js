import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRouteMatch } from "react-router-dom";
import { Switch, Link, Route } from 'react-router-dom';
import AddProduct from "./product/AddProduct";
import ProductList from "./product/ProductList";
import Cart from './Cart'
import axios from 'axios';

function UserProfile(props) {
    let [user, setUser] = useState('');
    let { path, url } = useRouteMatch();
    let [role, setRole] = useState(null)
    let [count, setCount] = useState(0);
    let [cartList,setCartList] = useState([]);

    useEffect(() => {
        axios.get(`/cart/read/${JSON.parse(localStorage.getItem('user')).username}`)
        .then(res => {
          //  console.log(res.data)
            setCartList(res.data.products ? res.data.products : [])
            setCount(cartList.length)
        })
        .catch(err => console.log(err))

        if (localStorage.role) {
            setRole(localStorage.role)
        }
      //  console.log(props)
        props.setLoginStatus(true);
        let userObj = JSON.parse(localStorage.getItem('user'))
        setUser({ ...userObj });
       // console.log(userObj)
    }, [count,cartList])

    const getCount = (cartItems) => {
        // let totalQty = 0;
        // cartItems.forEach(ele => {
        //     totalQty += 1;
        // });
        setCount(cartItems);
    }


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
                        <Link className="nav-link fs-5" to={`${url}/addproduct`} > Add Product</Link>
                    </div>
                    <div className="nav-item ms-4" hidden={isUser()}>
                        <Link className="nav-link fs-5" to={`${url}/cart`}>Cart
                            <span className="badge bg-danger text-light ms-2 me-2">{count}</span>
                        </Link>
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
                        <ProductList cnt={setCount}/>
                    </Route>
                    <Route path={`${path}/cart`}>
                        <Cart cartList={cartList}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default UserProfile;