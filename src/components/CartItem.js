function CartItem(props) {
  //  console.log(props)
    let ele = props.data;
    return (
        <div className="w-75 ms-5">
            <ul className="list-unstyled d-flex justify-content-around bg-light p-3 shadow ">
                <li><img src={ele.image} width={70} height={70}></img></li>
                <li>{ele.name}</li>
                <li>Rs.{ele.price}</li>
                <li><div>
                    <button className="btn btn-success me-3" onClick={() => { props.addItem(ele) }}>+</button>
                    <button className="btn btn-danger" onClick={() => { props.removeItem(ele) }}>-</button>
                </div></li>
            </ul>
        </div>
    )
}

export default CartItem;