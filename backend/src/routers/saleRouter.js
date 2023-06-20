const { Router } = require('express');
const { saleController } = require('../controllers');
const { validateBody, validateFields } = require('../middlewares/validateNewSaleFields');
const validateUpdateSaleQuantity = require('../middlewares/validateUpdateSaleQuantity');

const saleRouter = Router();

saleRouter.get('/', saleController.listSales);

saleRouter.get('/:id', saleController.listSaleById);

saleRouter.post(
  '/',
  validateBody,
  validateFields,
  saleController.createNewSale,
);

saleRouter.put(
  '/:saleId/products/:productId/quantity',
  validateUpdateSaleQuantity,
  saleController.updateSaleQuantity,
);

saleRouter.delete('/:id', saleController.deleteSale);

module.exports = saleRouter;