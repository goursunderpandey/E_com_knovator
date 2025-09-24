const express = require('express');
const orderController = require('../Controller/Order.controller');

const router = express.Router();


router.post('/placeOrder', orderController.createorder);

router.get('/getallorder', orderController.getallorders);



module.exports = router;