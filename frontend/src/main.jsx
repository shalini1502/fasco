// import { createRoot } from 'react-dom/client'
import "./index.css";
// import { BrowserRouter } from 'react-router-dom'
// import ShopContextProvider from './context/ShopContext.jsx'

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <ShopContextProvider>
//       <App />
//     </ShopContextProvider>
//   </BrowserRouter>,
// )

// src/main.jsx
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
      <ToastContainer position="top-right" />
    </ShopContextProvider>
  </BrowserRouter>
);
