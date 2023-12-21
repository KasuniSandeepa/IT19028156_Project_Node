const mongoose = require("mongoose");
const Category = require('../models/category.model');

const createCategory = async (req,res) => {
    if(req.body){
        const category = new Category(req.body);
        await category.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }
}

const getAllCategories = async (req,res) => {
    await Category.find({}).populate('products','code name amount size')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        })
}

const getProductsForCategory = async (req,res) => {
    if(req.params && req.params.id){
        const category = await Category.findById(req.params.id).populate('products','code name amount size')
            .then(data => {
                res.status(200).send({ data: data.products });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }
}

const getCategoryById = async (req,res) => {
    if(req.params && req.params.id){
        const category = await Category.findById(req.params.id).populate('products','code name amount size')
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            })
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getProductsForCategory,
    getCategoryById
}