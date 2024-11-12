import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate =useNavigate();

  const addToCart = async (itemId, size) => {
    // Implementing a basic validation for size selection
    if (!size) {
      toast.error("Chọn size cần mua");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartItemsCount = () => {
    let count = 0;
    for(let products in cartItems) {
      for(let product in cartItems[products])
      {
        try {
          if (cartItems[products][product] > 0) {
            count+= cartItems[products][product]
          }
        }
        catch(error) {
            console.error(error);
        }
      }
    }
    return count;
  };
  const updateQuanity = async (itemId, size,quantity) =>{
    const cartData = structuredClone(cartItems)
    cartData[itemId][size] = quantity;

    if (quantity <= 0) {
      delete cartData[itemId][size];
    }
    setCartItems(cartData);
  }


  const handleIncrement = () => {
    const cartData = structuredClone(cartItems)
    const newQuantity = cartData[itemId][size] + 1;
    setQuantity(newQuantity);
    updateQuantity(item._id, item.size, newQuantity); // Update quantity in the backend
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for ( const items in cartItems)
    {
      const productDetail = products.find((product)=> product._id === items);
      for (let item in cartItems[items]) {
            try {
              if (cartItems[items][item] > 0) {
                total += cartItems[items][item] * productDetail.price;
              }
            } catch (error) {
              console.error(error);
            }
          }
    }
    // for (let products in cartItems) {
    //   for (let product in cartItems[products]) {
    //     try {
    //       if (cartItems[products][product] > 0) {
    //         total += cartItems[products][product] * cartItems[products].price;
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // }
    return total;
  }



  useEffect(() => {
   
  }, [cartItems]);

  // console.log(cartItems)

  //   const addToCart = (productId) => {
  //       setCartItems(
  //           {...cartItems, [productId]: cartItems[productId] + 1 })
  //       console.log(cartItems)
  //   }

  //   const removeFromCart = (productId) => {
  //       setCartItems(
  //           {...cartItems, [productId]: cartItems[productId] - 1 })
  //       if(cartItems[productId]===0){
  //           delete cartItems[productId]
  //       }
  //   }
  //   const getCartItemsCount = () => {
  //       let count=0;
  //       for(let productId in cartItems){
  //           if(cartItems[productId] > 0)
  //           {
  //               count+=cartItems[productId];
  //           }
  //           // count+=cartItems[productId];
  //       }
  //       return count;
  //   }
  //   const getTotalCartAmount = () => {
  //       let total=0;
  //       for(let productId in cartItems){
  //           if(cartItems[productId] > 0)
  //           {
  //               let itemInfo = all_product.find((product)=> product.id ===Number(productId))
  //               total+= itemInfo.new_price*cartItems[productId];
  //           }
  //           // total+=all_product[productId-1].new_price * cartItems[productId];
  //       }
  //       return total;
  //   }

  const value = {
    products,
    search,
    currency,
    delivery_fee,
    showSearch,
    setSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartItemsCount,
    updateQuanity,
    getTotalCartAmount,
    navigate
   
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
