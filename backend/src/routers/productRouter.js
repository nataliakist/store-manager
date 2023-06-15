const { Router } = require('express');
const { productController } = require('../controllers');

const productRouter = Router();

productRouter.get('/', productController.listProducts);

module.exports = productRouter;