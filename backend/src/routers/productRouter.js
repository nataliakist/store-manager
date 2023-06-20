const { Router } = require('express');
const { productController } = require('../controllers');
const validateNewProductName = require('../middlewares/validateNewProductName');

const productRouter = Router();

productRouter.put(
  '/:id',
  validateNewProductName,
  productController.updateProduct,
);

productRouter.delete('/:id', productController.deleteProduct);

productRouter.get('/search', productController.getProductByQuery);

productRouter.get('/:id', productController.listProductById);

productRouter.get('/', productController.listProducts);

productRouter.post(
  '/',
  validateNewProductName,
  productController.createNewProduct,
);

module.exports = productRouter;