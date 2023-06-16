const { Router } = require('express');
const { productController } = require('../controllers');
const validateNewProductName = require('../middlewares/validateNewProductName');

const productRouter = Router();

productRouter.get('/:id', productController.listProductById);
productRouter.get('/', productController.listProducts);
productRouter.post(
  '/',
  validateNewProductName,
  productController.createNewProduct,
);

module.exports = productRouter;