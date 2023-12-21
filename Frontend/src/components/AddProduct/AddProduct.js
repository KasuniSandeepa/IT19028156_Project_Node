import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import React, {Component} from "react";


const initialState = {
    code: '',
    name: '',
    amount: 0,
    size: 0,
    price: 0,
    categories: [],
    options: [],
    selectedCategories: []
}

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:8087/category/')
            .then(response => {
                this.setState({ categories: response.data.data },() => {
                    console.log(response.data.data )
                    let data = [];
                    this.state.categories.map((item, index) => {
                        let category = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(category)
                    });
                    this.setState({options: data})
                })
                console.log(this.state.categories)
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onCategorySelect(e) {
        this.setState({ selectedCategories: e ? e.map(item => item.value) : [] })
    }

    onSubmit(e){
        e.preventDefault();
        let product = {
            code: this.state.code,
            name: this.state.name,
            amount: this.state.amount,
            size: this.state.size,
            price: this.state.price,
            categories: this.state.categories,
        };
        console.log("Data to Send ",product);
        axios.post('http://localhost:8087/product/create',product)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Data Inserted Successfully',
                    text: 'New Product was created!',
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

    render(){
        return(
            <div className="container">
                <h1>Add Product</h1>

                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Code" className="form-label">Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="code"
                            name="code"
                            value={this.state.code}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Amount" className="form-label">Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            value={this.state.amount}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Size" className="form-label">Size</label>
                        <input
                            type="number"
                            className="form-control"
                            id="size"
                            name="size"
                            value={this.state.size}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Price" className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={this.state.price}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Categories" className="form-label">Select Categories</label>
                        <Select
                            options={ this.state.options }
                            onChange={this.onCategorySelect}
                            className="basic-multi-select"
                            isMulti
                        />
                    </div>
                    <br/>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddProduct;