const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { mockProducts } = require('./mocks/product.controller.mock');

describe('Testando a camada service dos products', function () {
  describe('a função findAll', function () {
    it('retorna status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAll').resolves({
        type: null, message: mockProducts,
      });

      await productController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockProducts);
    });
  });

  describe('a função findById', function () {
    it('retorna status 200 e o produto solicitado', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findById').resolves({
        type: null, message: [mockProducts],
      });

      await productController.listProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([mockProducts]);
    });

    it('retorna erro quando o produto não é encontrado', async function () {
      const res = {};
      const req = { params: { id: 999 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findById').resolves({
        type: 'PRODUCT_NOT_FOUND', message: 'Product not found',
      });

      await productController.listProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});