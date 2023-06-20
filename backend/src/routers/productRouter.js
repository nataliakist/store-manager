const { Router } = require('express');
const { productController } = require('../controllers');
const validateNewProductName = require('../middlewares/validateNewProductName');

const productRouter = Router();

productRouter.get('/search', productController.getProductByQuery);

productRouter.get('/', productController.listProducts);

productRouter.get('/:id', productController.listProductById);

productRouter.post(
  '/',
  validateNewProductName,
  productController.createNewProduct,
);

productRouter.put(
  '/:id',
  validateNewProductName,
  productController.updateProduct,
);

productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;