import { Router } from 'express';
import PaymentController from './payment.controller';

const route = Router();

route.get('/', ( request, response ) => {
  response.json({
    message: 'hello world with Typescript'
  })
});

route.post('/create-checkout-session', new PaymentController().createCheckoutSession);

export default route;