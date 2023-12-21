const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");

module.exports = function(){

    router.get("/", controller.getAllProducts);
    router.post("/create", controller.createProduct);
    router.post("/calculatePrice", controller.calculateTotalPrice);
    router.delete("/delete/:id", controller.deleteProduct);

    return router;
}