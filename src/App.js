import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Switch, Link, Route, useHistory } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Testt from './components/Testt'
import { useEffect, useState } from 'react';
import Products from './components/product/Products';
import AdminProfile from './components/AdminProfile';
import { useSelector } from 'react-redux';

function App() {
  let [loginStatus, setLoginStatus] = useState(false);
  let [userRole, setUserRole] = useState(null)
  const cartItems = useSelector((store) => store.cartReducer)
  console.log("cartitems ", cartItems)
  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.clear();
  }

  const getCartItemCount = () => {
    let totalQty = 0;
    cartItems.forEach(ele => {
      totalQty = totalQty + ele.qty;
    });
    return totalQty;
  }

  useEffect(() => {
    if (localStorage.role) {
      setUserRole(localStorage.role)
    }
    if (localStorage.token) {
      setLoginStatus(true)
    }
    console.log(localStorage.user)
    console.log(localStorage.token)
  })

  return (
    <BrowserRouter>
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a class="navbar-brand fs-3 ms-3" href="#">Carty</a>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/products" hidden={!loginStatus}>Products</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-success" >Cart
                <span className="badge bg-warning text-dark ms-2 me-2">{getCartItemCount()}</span></button>
            </li>
            <li className="nav-item" hidden={loginStatus}>
              <Link className="nav-link fs-5" to="/register" >Register</Link>
            </li>
            <li className="nav-item" hidden={!loginStatus}>
              {(userRole === 'admin' && <Link className="nav-link fs-5" to="/adminprofile"  >Profile</Link>)}
              {(userRole === 'user' && <Link className="nav-link fs-5" to="/userprofile" >Profile</Link>)}
            </li>
            {
              !loginStatus ?
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/login">Login</Link>
                </li>
                :
                <li className="nav-item">
                  <Link className="nav-link fs-5" onClick={handleLogout} to="/login">Logout</Link>
                </li>
            }
          </ul>
        </div>
      </div>
      <div className="container">
        <Switch>
          <Route path="/home"><Home /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/testt"><Testt /></Route>
          <Route path="/products"><Products /></Route>
          <Route path="/userprofile"><UserProfile setLoginStatus={setLoginStatus} /></Route>
          <Route path="/adminprofile"><AdminProfile /></Route>
        </Switch>
      </div>



    </BrowserRouter>
  );
}

export default App;
