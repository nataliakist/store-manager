const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const {
  mockSales,
  mockSaleById,
  mockNewSale,
  mockNewSaleResolve,
  mockNewSaleQuantity,
} = require('./mocks/sale.controller.mock');
const validateNewSaleFields = require('../../../src/middlewares/validateNewSaleFields');
const validateUpdateSaleQuantity = require('../../../src/middlewares/validateUpdateSaleQuantity');

describe('Testando a camada controller das vendas', function () {
  describe('a função findAll', function () {
    it('retorna status 200 e a lista de vendas', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findAll').resolves({
        type: null, message: mockSales,
      });

      await saleController.listSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockSales);
    });
  });

  describe('a função findById', function () {
    it('retorna status 200 e a venda solicitada', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById').resolves({
        type: null, message: [mockSaleById],
      });

      await saleController.listSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([mockSaleById]);
    });

    it('retorna erro quando a venda não é encontrada', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById').resolves({
        type: 'SALE_NOT_FOUND', message: 'Sale not found',
      });

      await saleController.listSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  describe('a função createNewSale', function () {
    it('ao enviar dados válidos cadastra com sucesso', async function () {
      const res = {};
      const req = {
        body: mockNewSale,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'insert').resolves({
        type: null, message: mockNewSaleResolve,
      });

      await saleController.createNewSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockNewSaleResolve);
    });

    describe('a função validateBody', function () {
      it('Passando os dados corretamente chama o próximo middleware', async function () {
        const res = {};
        const req = {
          body: [{
            productId: 2,
            quantity: 2,
          }],
        };
    
        const next = sinon.stub().returns();
    
        await validateNewSaleFields.validateBody(req, res, next);
    
        expect(next).to.have.been.calledWith();
      });
    });

    describe('a função validateFields', function () {
      it('passando os dados corretamente chama o próximo middleware', async function () {
        const res = {};
        const req = {
          body: [{
            productId: 2,
            quantity: 2,
          }],
        };
    
        const next = sinon.stub().returns();
    
        await validateNewSaleFields.validateFields(req, res, next);
    
        expect(next).to.have.been.calledWith();
      });
    });
  });

  describe('a função deleteProduct', function () {
    it('ao enviar um id válido deleta com sucesso', async function () {
      const res = {};
      const req = {
        params: 1,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'deleteById').resolves({ type: null });

      await saleController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
  });

  describe('a função updateSaleQuantity', function () {
    it('altera com sucesso a quantidade do produto', async function () {
      const req = { params: { saleId: 1, productId: 1 }, body: { quantity: 2 } };
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'updateQuantityById')
        .resolves({ type: null, message: mockNewSaleQuantity });
  
      await saleController.updateSaleQuantity(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockNewSaleQuantity);
    });

    it('retorna erro quando a quantidade passada é igual a zero', async function () {
      const errorMessage = '"quantity" must be greater than or equal to 1';
      const req = { params: { saleId: 1, productId: 1 }, body: { quantity: 0 } };
      const res = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'updateQuantityById')
        .resolves({ type: null, message: errorMessage });
  
      await saleController.updateSaleQuantity(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(errorMessage);
    });
  });

  describe('a função validateUpdateSaleQuantity', function () {
    it('Passando os dados corretamente chama o próximo middleware', async function () {
      const res = {};
      const req = { params: { saleId: 1, productId: 1 }, body: { quantity: 2 } };
  
      const next = sinon.stub().returns();
  
      await validateUpdateSaleQuantity(req, res, next);
  
      expect(next).to.have.been.calledWith();
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});