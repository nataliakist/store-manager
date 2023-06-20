const { Router } = require('express');
const { saleController } = require('../controllers');
const { validateBody, validateFields } = require('../middlewares/validateNewSaleFields');

const saleRouter = Router();

saleRouter.delete('/:id', saleController.deleteSale);
saleRouter.get('/:id', saleController.listSaleById);
saleRouter.get('/', saleController.listSales);
saleRouter.post(
  '/',
  validateBody,
  validateFields,
  saleController.createNewSale,
);

module.exports = saleRouter;