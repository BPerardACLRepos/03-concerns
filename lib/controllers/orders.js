const { Router } = require('express');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    // OrderService
    //   .create(req.body)
    //   .then(order => res.send(order))
    //   .catch(next);
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {  // gets all orders from orders
    try {
      const orders = await OrderService.readAll();
      res.send(orders);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {  // gets order with :id from orders
    try {
      const order = await OrderService.readId(req.params.id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', async (req, res, next) => {  // changes order quantity with :id from orders
    try {
      const order = await OrderService.update(req.body, req.params.id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async (req, res, next) => {  // deletes order with :id from orders
    try {
      const order = await OrderService.delete(req.params.id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  });
