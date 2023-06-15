const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const { productModel } = require('../../../src/models');
const { mockProducts } = require('./mocks/product.model.mock');

describe('Testando a camada model dos products', function () {
  describe('a função findAll', function () {
    it('retorna com sucesso um array de produtos', async function () {
      // arrange
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      // act
      const result = await productModel.findAll();
      // assert
      expect(result).to.be.deep.equal(mockProducts);
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});