import dotenv from "dotenv";
dotenv.config();

import express from 'express';

import routes from './payment/payment.routes';

const app = express();
const PORT = 3000

app.use(express.json())
app.use(express.static('public'));

app.use(routes);

app.listen(PORT, () => `Server running on port ${PORT}`)