const app = require('../../app');
const request = require('supertest');
const Category = require('../models/category.model');
const Product = require('../models/product.model');



jest.setTimeout(30000);

let id = '';

beforeAll(async () => {
    await Category.deleteMany(); //delete already exist categories
    await Product.deleteMany(); //delete already exist categories
});

test('should insert a new Category', async () => {
    await request(app).post('/category/create').send({
        name: "Groceries",
        description:"Containr Groceries"

    }).expect(200).then((res) => {
        id = res.body._id;
    });

})

