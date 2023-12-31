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
  mockSales,
} = require('../unit/controllers/mocks/sale.controller.mock');

describe('Teste de integração de sales', function () {
  it('GET /sales retorna uma lista de todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([mockSales]);

    const response = await chai.request(app).get('/sales');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(mockSales);
  });

  it('POST /sales sem enviar informações no body', async function () {
    const response = await chai
      .request(app)
      .post('/sales')
      .send({});

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: 'body request is empty',
    });
  });

  it('POST /sales sem passar productId', async function () {
    const response = await chai
      .request(app)
      .post('/sales')
      .send([{
          quantity: 2,
        }]);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"productId" is required' });
  });

  it('POST /sales sem passar quantity', async function () {
    const response = await chai
      .request(app)
      .post('/sales')
      .send([{
        productId: 2,
      }]);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"quantity" is required' });
  });

  it('POST /sales passando quantidade 0', async function () {
    const response = await chai
      .request(app)
      .post('/sales')
      .send([{
        productId: 2,
        quantity: 0,
      }]);

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ 
      message: '"quantity" must be greater than or equal to 1', 
    });
  });

  it('PUT /sales/:saleId/products/:productId;quantity quantidade 0', async function () {
    const response = await chai
      .request(app)
      .put('/sales/1/products/1/quantity')
      .send({
        quantity: 0,
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ 
      message: '"quantity" must be greater than or equal to 1', 
    });
  });

  it('PUT /sales/:saleId/products/:productId;quantity productId inválido', async function () {
    const response = await chai
      .request(app)
      .put('/sales/1/products/1/quantity')
      .send();

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ 
      message: '"quantity" is required', 
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});