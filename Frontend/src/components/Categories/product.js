import axios from "axios";
import React, { Component }from "react";

class Product extends Component{
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            category: ''
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8087/category/getProductForCategory/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ products: response.data.data })
                console.log(response.data.data)
            })
            .catch(error => {
                alert(error.message)
            })

        axios.get(`http://localhost:8087/category/getCategoryById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ category: response.data.data })
                console.log(response.data.data)
            })
            .catch(error => {
                alert(error.message)
            })
    }

    render(){
        return(
            <div>
                <center><h1>Products for Category {this.state.category.name}</h1></center>
                <br/>
                <div className={"container"}>
                    <table className="table table-hover">

                        <th>Code</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Size</th>

                        <tbody>
                        {this.state.products.length > 0 && this.state.products.map((item,index) => (
                            <tr  key={index}>
                                <td> {item.code}</td>
                                <td> {item.name}</td>
                                <td> {item.amount}</td>
                                <td> {item.size}</td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Product;