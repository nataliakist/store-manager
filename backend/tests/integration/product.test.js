const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../src/app');

const connection = require('../../src/models/connection');

const {
  mockProducts,
} = require('../unit/controllers/mocks/product.controller.mock');

describe('Teste de integração de products', function () {
  it('GET /products retorna uma lista de todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([mockProducts]);

    const response = await chai.request(app).get('/products');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockProducts);
  });
  it('POST /products sem nome retorna erro', async function () {
    const response = await chai
      .request(app)
      .post('/products')
      .send({});

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"name" is required',
    });
  });

  it('PUT /products:id sem nome retorna erro', async function () {
    const response = await chai
      .request(app)
      .put('/products/1')
      .send({});

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: '"name" is required',
    });
  });
    
  afterEach(function () {
    sinon.restore();
  });
});