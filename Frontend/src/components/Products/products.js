import axios from "axios";
import Swal from "sweetalert2";
import React, { Component }from "react";
import Select from "react-select";

class Products extends Component{
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:8087/product/')
            .then(response => {
                this.setState({ products: response.data.data })
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })

    }

    deleteProduct(e , productId) {
        console.log("I am on Delete", productId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8087/product/delete/${productId}`)
                Swal.fire(
                    'Deleted!',
                    'Product has been deleted.',
                    'success'
                )
            }
        })
    }

    render(){
        return(
            <div className="container">
                <center><h1>All Products</h1></center>
                <br/>
                <div className={"container"}>
                    <table className="table table-hover">

                        <th>Code</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>DELETE</th>

                        <tbody>
                        {this.state.products.length > 0 && this.state.products.map((item,index) => (
                            <tr  key={index}>
                                <td> {item.code}</td>
                                <td> {item.name}</td>
                                <td> {item.amount}</td>
                                <td> {item.size}</td>
                                <td> {item.price}</td>
                                <td><button type="button" className="btn btn-outline-danger"  onClick={e => this.deleteProduct(e, item._id)} >Delete</button></td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Products;
