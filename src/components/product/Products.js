import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import Cart from '../Cart'

function Products() {
  let { path, url } = useRouteMatch();
  let [role, setRole] = useState(null)

  useEffect(() => {
    if (localStorage.role) {
      setRole(localStorage.role)
    }
  })

  function isUser() {
    return role === 'user' ? false : true;
  }

  function isAdmin() {
    return role === 'admin' ? false : true;
  }

  return (
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
  )

}

{/* <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">...</div>
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">...</div>
  <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">...</div>
</div>  */}

export default Products;