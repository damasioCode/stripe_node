import stripe from 'stripe';
import { Request, Response } from 'express';

class PaymentController {

  domain: string; 
  
  constructor() {
    this.domain = 'http://localhost:3000';

    this.createCheckoutSession = this.createCheckoutSession.bind(this);
  }

  async createCheckoutSession(request: Request, response: Response) {
    const stripeInstance = new stripe(process.env.SK_STRIPE ?? ''); 

    const session = await stripeInstance.checkout.sessions.create({
      line_items: [
        {
          price: `${process.env.PRODUCT_TEST}`,
          quantity: 1,
        },
        // {
        //   price_data: {
        //     currency: "brl",  // Substitua pela moeda desejada
        //     product_data: {
        //       name: "Produto Dinâmico"
        //     },
        //     unit_amount: 10.50 * 100  // Substitua pelo valor desejado em centavos
        //   },
        //   quantity: 2
        // }
      ],
      mode: "payment",
      success_url: `${this.domain}/success.html`,
      cancel_url: `${this.domain}/cancel.html`,
    });

    if (session.url) {
      response.redirect(303, session.url);
    } else {
      // Trate o caso em que a URL da sessão é nula
      response.status(500).send('Erro ao criar sessão de checkout.');
    }
    
  }
}

export default PaymentController;