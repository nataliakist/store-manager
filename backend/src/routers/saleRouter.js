const { Router } = require('express');
const { saleController } = require('../controllers');
const { validateBody, validateFields } = require('../middlewares/validateNewSaleFields');
const validateUpdateSaleQuantity = require('../middlewares/validateUpdateSaleQuantity');

const saleRouter = Router();

saleRouter.get('/:id', saleController.listSaleById);

saleRouter.get('/', saleController.listSales);

saleRouter.put(
  '/:saleId/products/:productId/quantity',
  validateUpdateSaleQuantity,
  saleController.updateSaleQuantity,
);

saleRouter.delete('/:id', saleController.deleteSale);

saleRouter.post(
  '/',
  validateBody,
  validateFields,
  saleController.createNewSale,
);

module.exports = saleRouter;