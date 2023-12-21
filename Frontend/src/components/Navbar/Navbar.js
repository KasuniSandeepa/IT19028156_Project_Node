import React, { Component }from "react";

class Navbar extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#e3f2fd"}}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Inventory Management System</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/categories">Categories</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/add-category">Add Category</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/add-product">Add Product</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/products">Products</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/orders">Orders</a>
                                </li>


                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Navbar;