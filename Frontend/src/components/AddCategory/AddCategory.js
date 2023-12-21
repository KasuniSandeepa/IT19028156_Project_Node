import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import React, { Component }from "react";

const initialState = {
    name: '',
    description: '',
    products: [],
    options: [],
    selectedProducts: []
}

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onProductSelect = this.onProductSelect.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onProductSelect(e) {
        this.setState({ selectedProducts: e ? e.map(item => item.value) : [] })
    }

    componentDidMount(){
        axios.get('http://localhost:8087/product/')
            .then(response => {
                this.setState({ products: response.data.data },() => {
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
                console.log(this.state.products)
            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })

    }

    onSubmit(e){
        e.preventDefault();
        let category = {
            name: this.state.name,
            description: this.state.description,
            products: this.state.selectedProducts,
        };
        console.log("Data to Send ",category);
        axios.post('http://localhost:8087/category/create',category)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Data Inserted Successfully',
                    text: 'New Category was created!',
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
                <h1>Add Category</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="CategoryName" className="form-label">Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="Products" className="form-label">Select Products</label>
                    <Select
                        options={ this.state.options }
                        onChange={this.onProductSelect}
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

export default AddCategory;