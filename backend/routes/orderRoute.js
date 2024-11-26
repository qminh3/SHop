import express from 'express';
import { placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateOrderStatus } from '../controllers/orderController.js';
import adminAuth from "../middleware/adminAuth.js";
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateOrderStatus)

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderRazorpay)
orderRouter.post('/razorpay',authUser,placeOrderStripe)
orderRouter.post('/userorder',authUser,userOrders)

export default orderRouter;