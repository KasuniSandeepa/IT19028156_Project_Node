import axios from "axios";
import React, { Component }from "react";
import CategoryImg from "./images/category.jpg"

class Categories extends Component{
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
        this.navigateProductPage = this.navigateProductPage.bind(this);
    }

    navigateProductPage(e, categoryId) {
        window.location = `/productForCategory/${categoryId}`
    }


    componentDidMount(){
        axios.get('http://localhost:8087/category/')
            .then(response => {
                this.setState({ categories: response.data.data })
                console.log(response.data.data)

            })
            .catch(error => {
                console.log(error.message)
                alert(error.message)
            })

    }

    render(){
        return(
            <div className="container">
                <center><h1>All Categories</h1></center>


                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {this.state.categories.length > 0 && this.state.categories.map((item,index) => (
                        <div className="card" key={index} style={{width: "18rem" ,  margin: "10px"}}>
                           <img src={CategoryImg} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Description : {item.description}</p>
                                <a href="#" className="btn btn-primary" onClick={e => this.navigateProductPage(e, item._id)}>Show the Products</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Categories;
