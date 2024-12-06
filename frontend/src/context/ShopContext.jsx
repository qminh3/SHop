import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const backendUrl = "http://localhost:3000";
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

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

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        log.console(error);
        toast.error(error.message);
      }
    }
  };

  const getCartItemsCount = () => {
    let count = 0;
    for (let products in cartItems) {
      for (let product in cartItems[products]) {
        try {
          if (cartItems[products][product] > 0) {
            count += cartItems[products][product];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return count;
  };
  const updateQuanity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    if (quantity <= 0) {
      delete cartData[itemId][size];
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        log.console(error);
        toast.error(error.message);
      }
    }
  };

  const handleIncrement = () => {
    const cartData = structuredClone(cartItems);
    const newQuantity = cartData[itemId][size] + 1;
    setQuantity(newQuantity);
    updateQuantity(item._id, item.size, newQuantity); // Update quantity in the backend
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const items in cartItems) {
      const productDetail = products.find((product) => product._id === items);
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

    return total;
  };

  useEffect(() => {}, [cartItems]);

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      log.console(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    search,
    currency,
    delivery_fee,
    showSearch,
    backendUrl,
    cartItems,
    token,
    setCartItems,
    setSearch,
    setShowSearch,
    addToCart,
    getCartItemsCount,
    updateQuanity,
    getTotalCartAmount,
    navigate,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
