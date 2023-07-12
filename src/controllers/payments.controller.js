export default class PaymentsController {
  constructor({ PaymentService, PurchaseService }) {
    this.paymentService = PaymentService;
    this.purchaseService = PurchaseService;
  }

  makePurchase = async (req, res, next) => {
    try {
      const { cartID } = req.params;
      const userMail = req.user.email;
      const { method } = req.query;
      let paymentIntent;

      
      const purchase = await this.purchaseService.makePurchase(
        cartID,
        userMail
      );

      if (!purchase) {
        throw new CustomError(
          'CONFLICT',
          'Out of stock. Try again later or contact us for updates.'
        );
      }

      if (method === 'card') {
        paymentIntent = await this.paymentService.createPaymentIntent(
          purchase._id
        );

        if (!paymentIntent) {
          throw new CustomError(
            'INTERNAL_SERVER_ERROR',
            'Payment intent could not be created'
          );
        }
      }

      res.status(200).json({
        success: true,
        payload: paymentIntent,
      });
    } catch (error) {
      next(error);
    }
  };
}