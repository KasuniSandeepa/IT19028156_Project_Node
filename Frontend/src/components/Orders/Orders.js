import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import React, { Component }from "react";
import CategoryImg from "../Categories/images/category.jpg";

class Orders extends Component{
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedProducts: [],
            products: [],
            options: [],
            totalAmount: [],
            distance: 0,
            distanceCharge: '',
            totalPrice: ''

        }
        this.Order = this.Order.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onProductSelect = this.onProductSelect.bind(this);
    }


    onProductSelect(e) {
        this.setState({ selectedProducts: e ? e.map(item => item.value) : [] })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    Order(e) {
        console.log("I am Here");
        let order = {
            distance: this.state.distance,
            selectedProducts: this.state.selectedProducts
        };

        console.log(order);

        axios.post('http://localhost:8087/product/calculatePrice',order)
            .then(response => {
                this.setState({ totalAmount: response.data.totalOrderCharge })
                this.setState({ distanceCharge: response.data.deliveryCharge })
                this.setState({ totalPrice: response.data.totalAmount})

                Swal.fire({

                    title: "Your Order Charge is : Rs."+this.state.totalAmount+"/=",
                    text: 'For Order Price : '+this.state.totalPrice+'/= , For Delivery Charge: '+this.state.distanceCharge+'/='
                })
            })
            .catch(error => {
                console.log(error.message)

                Swal.fire({
                    icon: 'warning',
                    title: 'Data Inserted Not Successful',
                    text: error.message,
                })
            })
    }

    componentDidMount(){
        axios.get('http://localhost:8087/product/')
            .then(response => {
                this.setState({ products: response.data.data })
                console.log(response.data.data)
                console.log(response.data.data )
                let data = [];
                this.state.products.map((item, index) => {
                    let product = {
                        value: item._id,
                        label: item.name
                    }
                    data.push(product)
                });
                this.setState({options: data})

            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })

    }

    order(e, productId){
        console.log(productId);
        this.setState({ selectedProducts:productId})
        console.log(this.state.selectedProducts.length)
    }

    render() {
        return(

            <div className="container">
                <br/>
                <h1>Order Products Here..</h1>
                <br/>
            <div className="mb-3">
                <label htmlFor="Products" className="form-label">Select Products for Order</label>
                <Select
                    options={ this.state.options }
                    onChange={this.onProductSelect}
                    className="basic-multi-select"
                    isMulti
                />
            </div>

                <div className="mb-3">
                    <label htmlFor="Distance" className="form-label">Enter the Distance in Kilo Meters from Colombo for Delivery</label>
                    <input
                        type="number"
                        className="form-control"
                        id="distance"
                        name="distance"
                        value={this.state.distance}
                        onChange={this.onChange}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={e => this.Order(e)}>Order</button>
            </div>



        )
    }
}

export default Orders;