import express from 'express';
const routing = express.Router();
import ProductListRoute from './ProductListRoute.js'
import CustomerRoute from './CustomerRoute.js'
import PaymentRelatedRoute from './PaymentRelatedRoute.js'
import ShopRoute from './ShopRoute.js'

routing.use("/",ProductListRoute);
routing.use("/customer",CustomerRoute);
routing.use('/payment',PaymentRelatedRoute);
routing.use('/shop',ShopRoute);



export default routing;