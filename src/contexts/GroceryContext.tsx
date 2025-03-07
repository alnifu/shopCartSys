import React, { createContext, useContext, useState } from "react";

interface GroceryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: any;
}

interface CartItem extends GroceryItem {
  cartQuantity: number;
}

interface GroceryContextType {
  groceries: GroceryItem[];
  cart: CartItem[];
  addToCart: (item: GroceryItem) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  updateGroceryQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const GroceryContext = createContext<GroceryContextType | undefined>(undefined);

export const GroceryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groceries, setGroceries] = useState<GroceryItem[]>([
    { id: 1, name: "Apple", price: 35, quantity: 30, image: require("../images/Apple.jpg") },
  { id: 2, name: "Banana", price: 15, quantity: 80, image: require("../images/Banana.jpg") },
  { id: 3, name: "Coconut", price: 60, quantity: 15, image: require("../images/Coconut.jpg") },
  { id: 4, name: "Dragon Fruit", price: 100, quantity: 10, image: require("../images/DragonFruit.jpg") },
  { id: 5, name: "RTX 5090 GigaByte", price: 50000, quantity: 1, image: require("../images/RTX5090.jpg") },
  { id: 6, name: "AMD Ryzen 9 9950X3D", price: 30000, quantity: 5, image: require("../images/AMD9950X3D.jpg") },
  { id: 7, name: "Playstation 5 Pro", price: 38000, quantity: 7, image: require("../images/PS5Pro.jpg") },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: GroceryItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, cartQuantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (id: number, change: number) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === id ? { ...cartItem, cartQuantity: cartItem.cartQuantity + change } : cartItem
        )
        .filter((cartItem) => cartItem.cartQuantity > 0) // Remove if quantity reaches zero
    );
  };

  const updateGroceryQuantity = (id: number, change: number) => {
    setGroceries((prevGrocery) =>
      prevGrocery
        .map((groceryItem) =>
          groceryItem.id === id ? { ...groceryItem, quantity: groceryItem.quantity + change } : groceryItem
        )
        .filter((groceryItem) => groceryItem.quantity > 0) // Remove if quantity reaches zero
    );
  };

  const clearCart = () => {
    setCart([]);
};

  return (
    <GroceryContext.Provider value={{ groceries, cart, addToCart, clearCart, updateCartQuantity, updateGroceryQuantity }}>
      {children}
    </GroceryContext.Provider>
  );
};

export const useGrocery = () => {
  const context = useContext(GroceryContext);
  if (!context) {
    throw new Error("useGrocery must be used within a GroceryProvider");
  }
  return context;
};
