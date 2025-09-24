const express = require('express');
const productController = require('..//Controller/Product.controller');

const router = express.Router();


router.get('/getallproduct', productController.getproduct);



module.exports = router;