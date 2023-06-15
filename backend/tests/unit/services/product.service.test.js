const sinon = require('sinon');
const { expect } = require('chai');

const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { mockProducts } = require('./mocks/product.service.mock');

describe('Testando a camada service dos products', function () {
  describe('a função findAll', function () {
    it('retorna a lista completa de produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(mockProducts);

      const result = await productService.findAll();

      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(mockProducts);
    });
  });
  describe('a função findById', function () {
    it('retorna o produto com o id solicitado', async function () {
      sinon.stub(productModel, 'findById').resolves(mockProducts[0]);

      const result = await productService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(mockProducts[0]);
    });

    it('retorna um erro quando o produto não é encontrado', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);

      const result = await productService.findById(999);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.deep.equal('Product not found');
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});