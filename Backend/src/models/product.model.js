const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    code:{ type: String, required: true, trim: true},
    name:{ type: String, required: true, trim: true},
    amount:{ type: Number, required: true, trim: true},
    size:{ type: Number, required: true, trim: true},
    price:{ type: Number, required: true, trim: true},
    categories:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'categories'}]
})

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;
