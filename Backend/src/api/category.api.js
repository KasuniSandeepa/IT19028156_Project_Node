const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");

module.exports = function(){
    router.get("/", controller.getAllCategories);
    router.post("/create", controller.createCategory);
    router.get("/getProductForCategory/:id", controller.getProductsForCategory);
    router.get("/getCategoryById/:id", controller.getCategoryById);
    return router;
}