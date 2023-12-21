import './App.css';
import React from 'react';
import Home from "./components/Home/Home";
import Orders from "./components/Orders/Orders";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Categories/product";
import Products from "./components/Products/products";
import AddProduct from "./components/AddProduct/AddProduct";
import Categories from "./components/Categories/categories";
import AddCategory from "./components/AddCategory/AddCategory";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



function App(){
    return(
        <Router>
            <Navbar/>
            <section>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/categories" component={Categories}/>
                    <Route path="/add-category" component={AddCategory}/>
                    <Route path="/add-product" component={AddProduct}/>
                    <Route path="/products" component={Products}/>
                    <Route path="/productForCategory/:id" component={Product}/>
                    <Route path="/orders" component={Orders}/>
                </Switch>
            </section>
        </Router>
    );
}

export  default App;