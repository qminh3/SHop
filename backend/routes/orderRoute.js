import express from 'express';
import { placeOrder, placeOrderVisa, placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateOrderStatus,verifyStripe } from '../controllers/orderController.js';
import adminAuth from "../middleware/adminAuth.js";
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();

// TÍNH NĂNG CHO ADMIN
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateOrderStatus)

// PHƯƠNG THỨC THANH TOÁN
orderRouter.post('/visa', authUser, placeOrderVisa);
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderRazorpay)
orderRouter.post('/razorpay',authUser,placeOrderStripe)

//USER
orderRouter.post('/userorder',authUser,userOrders)

// veify payment 
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;