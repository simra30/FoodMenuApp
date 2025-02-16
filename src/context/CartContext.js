import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem("cart");
      if (savedCart) setCart(JSON.parse(savedCart));
    };
    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
    };
    saveCart();
  }, [cart]);

  const addToCart = (item, quantity, instructions) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity, instructions }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity, instructions }]);
    }
  };

  const updateQuantity = (itemId, quantity) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const updateInstructions = (itemId, instructions) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, instructions } : cartItem
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((cartItem) => cartItem.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        updateInstructions,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};