// import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export const ShopContext = createContext();

// const ShopContextProvider = (props) => {
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const navigate = useNavigate();

//   const currency = "$";
//   const delivery_fee = 10;

//   useEffect(() => {
//     // INFO: Load cart items from localStorage when the component mounts
//     const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
//     if (storedCartItems) {
//       setCartItems(storedCartItems);
//     }
//   }, []);

//   useEffect(() => {
//     // INFO: Save cart items to localStorage whenever cartItems changes
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = async (itemId, size) => {
//     if (!size) {
//       toast.error("Please Select a Size");
//       return;
//     } else {
//       toast.success("Item Added To The Cart");
//     }

//     let cartData = structuredClone(cartItems);

//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }

//     setCartItems(cartData);
//   };

//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalCount += cartItems[items][item];
//           }
//         } catch (error) {
//           // INFO: Error Handling
//         }
//       }
//     }
//     return totalCount;
//   };

//   const updateQuantity = async (itemId, size, quantity) => {
//     if (quantity === 0) {
//       const productData = products.find((product) => product._id === itemId);
//       toast.success("Item Removed From The Cart");
//     }

//     let cartData = structuredClone(cartItems);

//     cartData[itemId][size] = quantity;

//     setCartItems(cartData);
//   };

//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       for (const item in cartItems[items]) {
//         try {
//           if (cartItems[items][item] > 0) {
//             totalAmount += itemInfo.price * cartItems[items][item];
//           }
//         } catch (error) {}
//       }
//     }
//     return totalAmount;
//   };

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//   };

//   return (
//     <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;

// src/context/ShopContext.jsx
// import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets"; // keep your existing products file
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export const ShopContext = createContext();

// const ShopContextProvider = ({ children }) => {
//   const [search, setSearch] = useState("");
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [auth, setAuth] = useState(() => {
//     try {
//       return JSON.parse(localStorage.getItem("auth")) || null;
//     } catch {
//       return null;
//     }
//   });

//   const navigate = useNavigate();

//   // Vite env
//   const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

//   const currency = "$";
//   const delivery_fee = 10;

//   // --- persist cart ---
//   useEffect(() => {
//     try {
//       const stored = JSON.parse(localStorage.getItem("cartItems"));
//       if (stored) setCartItems(stored);
//     } catch {
//       console.log("error");
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // --- persist auth ---
//   useEffect(() => {
//     if (auth) localStorage.setItem("auth", JSON.stringify(auth));
//     else localStorage.removeItem("auth");
//   }, [auth]);

//   // --- cart functions ---
//   const addToCart = (itemId, size) => {
//     if (!size) {
//       toast.error("Please select a size");
//       return;
//     }
//     toast.success("Item added to cart");

//     const cartData = structuredClone(cartItems || {});

//     if (cartData[itemId]) {
//       cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
//     } else {
//       cartData[itemId] = { [size]: 1 };
//     }

//     setCartItems(cartData);
//   };

//   const getCartCount = () => {
//     let total = 0;
//     for (const pid in cartItems) {
//       for (const size in cartItems[pid]) {
//         const qty = Number(cartItems[pid][size]) || 0;
//         total += qty;
//       }
//     }
//     return total;
//   };

//   const updateQuantity = (itemId, size, quantity) => {
//     const cartData = structuredClone(cartItems || {});
//     if (!cartData[itemId]) return;

//     if (quantity <= 0) {
//       delete cartData[itemId][size];
//       if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
//       toast.success("Item removed from cart");
//     } else {
//       cartData[itemId][size] = quantity;
//     }
//     setCartItems(cartData);
//   };

//   const getCartAmount = () => {
//     let total = 0;
//     for (const pid in cartItems) {
//       const product = products.find((p) => p._id === pid);
//       if (!product) continue;
//       for (const size in cartItems[pid]) {
//         const qty = Number(cartItems[pid][size]) || 0;
//         total += product.price * qty;
//       }
//     }
//     return total;
//   };

//   // --- Auth: register/login/logout ---
//   // Helper to add Authorization header when token present
//   const authHeaders = (extra = {}) => {
//     const headers = { "Content-Type": "application/json", ...extra };
//     if (auth?.token) headers["Authorization"] = `Bearer ${auth.token}`;
//     return headers;
//   };

//   const register = async ({ name, email, password }) => {
//     try {
//       const res = await fetch(`${API_BASE}/api/user/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Registration failed");
//       toast.success("Registered successfully");
//       // accept token if returned
//       if (data.token) {
//         setAuth({ token: data.token, user: data.user || null });
//       }
//       navigate("/");
//       return data;
//     } catch (err) {
//       toast.error(err.message || "Registration error");
//       throw err;
//     }
//   };

//   const login = async ({ email, password }) => {
//     try {
//       const res = await fetch(`${API_BASE}/api/user/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Login failed");
//       toast.success("Logged in");
//       setAuth({ token: data.token, user: data.user || null });
//       navigate("/");
//       return data;
//     } catch (err) {
//       toast.error(err.message || "Login error");
//       throw err;
//     }
//   };

//   const logout = () => {
//     setAuth(null);
//     toast.info("Logged out");
//     navigate("/login");
//   };

//   const value = {
//     products,
//     currency,
//     delivery_fee,
//     search,
//     setSearch,
//     showSearch,
//     setShowSearch,
//     cartItems,
//     addToCart,
//     getCartCount,
//     updateQuantity,
//     getCartAmount,
//     navigate,
//     auth,
//     register,
//     login,
//     logout,
//     API_BASE,
//     authHeaders,
//   };

//   return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
// };

// export default ShopContextProvider;

// src/context/ShopContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("auth")) || null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const currency = "$";
  const delivery_fee = 10;

  useEffect(() => {
    try {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (storedCartItems) setCartItems(storedCartItems);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (auth) localStorage.setItem("auth", JSON.stringify(auth));
    else localStorage.removeItem("auth");
  }, [auth]);

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    toast.success("Item added to cart");
    const cartData = structuredClone(cartItems || {});
    if (cartData[itemId])
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    else cartData[itemId] = { [size]: 1 };
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let total = 0;
    for (const pid in cartItems) {
      for (const size in cartItems[pid]) {
        total += Number(cartItems[pid][size] || 0);
      }
    }
    return total;
  };

  const updateQuantity = (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems || {});
    if (!cartData[itemId]) return;
    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
      toast.success("Item removed from cart");
    } else {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let total = 0;
    for (const pid in cartItems) {
      const product = products.find((p) => p._id === pid);
      if (!product) continue;
      for (const size in cartItems[pid]) {
        total += product.price * Number(cartItems[pid][size] || 0);
      }
    }
    return total;
  };

  const authHeaders = (extra = {}) => {
    const headers = { "Content-Type": "application/json", ...extra };
    if (auth?.token) headers["Authorization"] = `Bearer ${auth.token}`;
    return headers;
  };

  const register = async ({ name, email, password }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      toast.success("Registered successfully");
      if (data.token) setAuth({ token: data.token, user: data.user || null });
      navigate("/");
      return data;
    } catch (err) {
      toast.error(err.message || "Registration error");
      throw err;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_BASE}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      toast.success("Logged in");
      setAuth({ token: data.token, user: data.user || null });
      navigate("/");
      return data;
    } catch (err) {
      toast.error(err.message || "Login error");
      throw err;
    }
  };

  const logout = () => {
    setAuth(null);
    toast.info("Logged out");
    navigate("/login");
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    auth,
    setAuth,
    register,
    login,
    logout,
    API_BASE,
    authHeaders,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
