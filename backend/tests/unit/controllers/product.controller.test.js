const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const validateNewProductName = require('../../../src/middlewares/validateNewProductName');
const {
  mockProducts,
  newProductMock,
  newProductMockDB,
} = require('./mocks/product.controller.mock');

describe('Testando a camada controller dos products', function () {
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

  describe('a função createNewProduct', function () {
    it('ao enviar dados válidos cadastra com sucesso', async function () {
      const res = {};
      const req = {
        body: newProductMockDB,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'insert').resolves({
        type: null, message: newProductMock,
      });

      await productController.createNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductMock);
    });
  });

  describe('a função validateNewProductName', function () {
    it('Ao tentar cadastrar um novo produto sem nome retorna erro', async function () {
      const res = {};
      const req = {
        body: {},
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await validateNewProductName(req, res);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Passando os dados corretamente chama o próximo middleware', async function () {
      const res = {};
      const req = {
        body: {
          name: 'Cedro do Loki',
        },
      };
  
      const next = sinon.stub().returns();
  
      await validateNewProductName(req, res, next);
  
      expect(next).to.have.been.calledWith();
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});