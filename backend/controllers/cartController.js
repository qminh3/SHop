import userModel from "../models/userModel.js";

 // thêm sản phẩm vào giỏ hàng 
const addToCart = async (req,res) => {
    try {
        const { userId, itemId, size} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:"Added to cart"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", success: false });
    }
}

// cập nhật giỏ hàng của user
const updateCart = async (req,res) => {
    try {
        const { userId, itemId, size, quanity} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quanity;
        
        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:"Cart updated"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", success: false });
    }
}

// lấy user cart
const getUserCart = async (req,res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({success:true,cartData})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server", success: false });
    }
}

export { addToCart,updateCart,getUserCart }