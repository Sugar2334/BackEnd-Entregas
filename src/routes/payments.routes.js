import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.middleware.js';

export default class PaymentsRouter extends express.Router {
  constructor({ PaymentController, Authorizator }) {
    super();
    this.authorizator = Authorizator;
    this.paymentController = PaymentController;
    this.setup();
  }

  setup = () => {
    this.post(
      '/:cartID/purchase/',
     
      [
        isAuthenticated,
      ],
      this.paymentController.makePurchase
    );
  };
}