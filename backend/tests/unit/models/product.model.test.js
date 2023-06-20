const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const { productModel } = require('../../../src/models');
const {
  mockProducts,
  newProductMockDB,
  validId,
  validName,
} = require('./mocks/product.model.mock');

describe('Testando a camada model dos products', function () {
  describe('a função findAll', function () {
    it('retorna com sucesso uma lista de produtos', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      // act
      const result = await productModel.findAll();
      // assert
      expect(result).to.be.deep.equal(mockProducts);
    });
  });

  describe('a função findById', function () {
    it('retorna com sucesso o produto solicitado', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([[mockProducts[0]]]);
      // act
      const result = await productModel.findById(1);
      // assert
      expect(result).to.be.deep.equal(mockProducts[0]);
    });
  });

  describe('a função insert', function () {
    it('cadastra com sucesso um novo produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await productModel.insert(newProductMockDB);

      expect(result).to.be.deep.equal(4);
    });
  });

  describe('a função updateById', function () {
    it('altera com sucesso um produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await productModel.updateById(validId, validName);

      expect(result).to.be.deep.equal(1);
    });
  });

  describe('a função deleteById', function () {
    it('deleta com sucesso um produto', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await productModel.deleteById(validId);

      expect(result).to.be.deep.equal(1);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});