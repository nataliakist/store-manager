const { Router } = require('express');
const { saleController } = require('../controllers');

const saleRouter = Router();

saleRouter.get('/:id', saleController.listSaleById);
saleRouter.get('/', saleController.listSales);

module.exports = saleRouter;