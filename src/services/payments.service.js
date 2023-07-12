export default class PaymentService {
    constructor({ ServerConfig, StripePayment, PurchaseService }) {
      this.serverConfig = ServerConfig;
      this.stripePayment = StripePayment;
      this.purchaseService = PurchaseService;
    }
  
    
    createPaymentIntent = async (id) => {
      try {
        
        const purchase = await this.purchaseService.getPurchaseById(id);
  
        
        const paymentData = {
          amount: purchase.subtotal * 100, 
          currency: 'usd',
          metadata: {
            purchaseID: purchase._id.toString(),
          },
        };
  
        
        const paymentIntent = await this.stripePayment.createPaymentIntent(
          paymentData
        );
  
        
        if (!paymentIntent) {
          throw new CustomError('Payment intent could not be created', 500);
        }
  
        
        await this.purchaseService.setPurchaseStatus(purchase._id, true);
        return paymentIntent;
      } catch (error) {
        throw error;
      }
    };
  }