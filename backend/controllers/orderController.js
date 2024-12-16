import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//global

const currency = "inr";
const deliveryCharge = 10;

// stripe method
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// cod method
const placeOrder = async (req, res) => {
  try {
    // get userId, items, amount, address from request body
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    // update giỏ hàng rỗng
    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.json({ success: true, message: "Đã đặt hàng thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Phí giao hàng",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",

      // customer_email: user.email,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};

const placeOrderRazorpay = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};
const placeOrderVisa = async (req, res) => {
  try {
    const { userId, items, amount, address, cardNumber, expiryDate, cvv } =
      req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Visa",
      payment: true,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order Placed and Payment Successful!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};

// ADMIN
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};

// USER
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", success: false });
  }
};

const verifyStripe = async (req, res) => {
    const {orderId ,success , userId} = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData: {}});
            res.json({ success: true, message: "Thanh toán thành công" });
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Thanh toán thất bại" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", success: false });
    }
}
export {
  placeOrder,
  placeOrderVisa,
  placeOrderRazorpay,
  placeOrderStripe,
  userOrders,
  allOrders,
  updateOrderStatus,
  verifyStripe,
};
