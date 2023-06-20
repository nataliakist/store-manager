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
  productName,
  productId,
  mockUpdateProduct,
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

  describe('a função updateProduct', function () {
    it('ao enviar dados válidos atualiza com sucesso', async function () {
      const res = {};
      const req = {
        params: { productId },
        body: { productName },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'updateById').resolves({
        type: null, message: mockUpdateProduct,
      });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockUpdateProduct);
    });
  });

  describe('a função deleteProduct', function () {
    it('ao enviar dados válidos deleta com sucesso', async function () {
      const res = {};
      const req = {
        params: { productId },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'deleteById').resolves({
        type: null });

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('ao enviar id inexistente retorna erro', async function () {
      const res = {};
      const req = {
        params: { productId },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'deleteById').resolves(
        { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' },
      );

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('ao enviar id inválido retorna erro', async function () {
      const res = {};
      const req = {
        params: 'a',
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'deleteById').resolves(
        { type: 'INVALID_VALUE', message: '"id" must be a number' },
      );

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });
  });

  describe('a função validateNewProductName', function () {
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