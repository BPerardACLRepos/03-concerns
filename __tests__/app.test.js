const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('03_separation-of-concerns-demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('ASYNC/AWAIT: creates a new order in our database and sends a text message', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  it('gets all orders in our database', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    const secondRes = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 33 });

    const thirdRes = await request(app)
      .get('/api/v1/orders');

    expect(thirdRes.body).toEqual([
      {
        id: '1',
        quantity: 10,
      },
      {
        id: '2',
        quantity: 33,
      },
    ]);
  });

  it('gets order with id in our database', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 23 });

    const secondRes = await request(app)
      .get('/api/v1/orders/1');

    expect(secondRes.body).toEqual(
      {
        id: '1',
        quantity: 23,
      });
  });

  it('updates order with id in our database', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 23 });

    const secondRes = await request(app)
      .put('/api/v1/orders/1')
      .send({ quantity: 7 });

    expect(secondRes.body).toEqual(
      {
        id: '1',
        quantity: 7,
      });
  });
});
