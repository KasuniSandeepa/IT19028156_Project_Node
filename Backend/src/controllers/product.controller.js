const mongoose = require("mongoose");
const Product = require('../models/product.model');

const createProduct = async (req,res) => {
    if(req.body){
        const product = new Product(req.body);
        await product.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }
}

const getAllProducts = async (req,res) => {
    await Product.find({}).populate('categories','name description')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        })
}


const deleteProduct = async (req, res) => {
    if (req.params && req.params.id) {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

        await Product.findByIdAndRemove(id);

        res.json({message: "Product Deleted Successfully"});
    }
}

const calculateTotalPrice = async (req,res) => {
    let totalAmount = 0;
    let totalOrderCharge = 0;
    let distanceCharge = 0;
    if(req.body){
        console.log(req.body);

        if(req.body.distance <= 2 ){
            distanceCharge = 1000;
            console.log(req.body);
        }else if(req.body.distance  >= 2 ){
            distanceCharge = 2000;
        }else if(req.body.distance  >=  4 ){
            distanceCharge = 4000;
        }else if(req.body.distance  >=  5 ){
            distanceCharge = 6000;
        }else if(req.body.distance  >= 6 ){
            distanceCharge = 8000;
        }

        if(req.body.selectedProducts.length > 0){
            for(let i=0 ; i<req.body.selectedProducts.length;i++){
                const product =  await Product.findById(req.body.selectedProducts[i])
                totalAmount += product.price;
                console.log(product)
            }
        }
        totalOrderCharge = totalAmount + distanceCharge;

        console.log(totalAmount);
    }
    res.status(200).send({ totalOrderCharge: totalOrderCharge , deliveryCharge: distanceCharge , totalAmount: totalAmount});
}

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    calculateTotalPrice
}