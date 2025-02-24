import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ActiveProvider } from "./context/ActiveContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ActiveProvider>

            <ProductProvider>
            <CartProvider>
              <App />
            </CartProvider>
            </ProductProvider>

        </ActiveProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
