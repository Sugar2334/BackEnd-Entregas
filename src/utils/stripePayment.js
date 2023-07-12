import Stripe from 'stripe';

export default class StripePayment {
  constructor({ ServerConfig }) {
    this.serverConfig = ServerConfig;
    this.stripe = Stripe(this.serverConfig.STRIPE_SECRET_KEY);
  }
  createPaymentIntent = async (data) => {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create(data);
      return paymentIntent;
    } catch (error) {
      throw error;
    }
  };
}