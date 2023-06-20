const sinon = require('sinon');
const { expect } = require('chai');

const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const {
  mockProducts,
  productName,
  productId,
  mockUpdateProduct,
} = require('./mocks/product.service.mock');

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

    it('retorna um erro quando é passado um id inválido', async function () {
      const result = await productService.findById('a');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.be.deep.equal('"id" must be a number');
    });
  });

  describe('a função insert', function () {
    it('cadastra com sucesso um novo produto', async function () {
      sinon.stub(productModel, 'insert').resolves(4);
      sinon.stub(productModel, 'findById').resolves(mockProducts[0]);

      const result = await productService.insert(productName);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mockProducts[0]);
    });
  });

  describe('a função updateById', function () {
    it('altera com sucesso um produto', async function () {
      sinon.stub(productModel, 'updateById').resolves(1);
      sinon.stub(productModel, 'findById').resolves(mockUpdateProduct);

      const result = await productService.updateById(productId, productName);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mockUpdateProduct);
    });
  });

  describe('a função deleteById', function () {
    it('deleta com sucesso um produto', async function () {
      sinon.stub(productModel, 'deleteById').resolves(1);
      sinon.stub(productModel, 'findById').resolves(mockUpdateProduct);

      const result = await productService.deleteById(productId);

      expect(result.type).to.equal(null);
    });

    it('retorna erro quando passado id inexistente', async function () {
      sinon.stub(productModel, 'findById').resolves();

      const result = await productService.deleteById(productId);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.deep.equal('Product not found');
    });

    it('retorna erro quando passado id inválido', async function () {
      sinon.stub(productModel, 'findById').resolves();

      const result = await productService.deleteById('a');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.be.deep.equal('"id" must be a number');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});