const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const { productModel } = require('../../../src/models');
const { mockProducts, newProductMockDB } = require('./mocks/product.model.mock');

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
  
  afterEach(function () {
    sinon.restore();
  });
});