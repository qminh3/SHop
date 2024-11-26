import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
    try {
        const {userId,items,amount,address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()
        
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order Place"})
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", success: false });
    }
}

const placeOrderStripe = async (req, res) => {
    try {
        
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", success: false });
    }
}

const placeOrderRazorpay = async (req, res) => {
    try {
        
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", success: false });
    }
}

const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,orders})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", success: false });
    }
};

const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;

        const orders = await orderModel.find({userId});

        res.json({success:true,orders})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", success: false });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", success: false });
    }
}

export { placeOrder, placeOrderRazorpay, placeOrderStripe, userOrders, allOrders, updateOrderStatus };